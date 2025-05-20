const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendTokenEmail = require('../../utils/mailer'); // Ensure this utility is implemented
const User = require('../models/user'); // Ensure this is your Objection.js model
require('dotenv').config();

const router = express.Router();

// Temporary in-memory storage for OTPs (use Redis or a database in production)
const otpStore = {};

// Signup route
router.post('/', async (req, res) => {
  const { email, password, firstname, lastname, phone_number } = req.body;

  if (!email || !password || !firstname || !lastname || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.query().findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate a 5-character OTP
    const otp = Math.random().toString(36).substring(2, 7).toUpperCase();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the OTP and user details temporarily (use a database or Redis in production)
    otpStore[email] = { otp, password: hashedPassword, firstname, lastname, phone_number };

    // Generate a JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the OTP and token to the user's email
    const emailContent = `
      Your OTP is: ${otp}
      Your signup token is: ${token}
    `;
    await sendTokenEmail(email, emailContent);

    res.status(200).json({ message: 'OTP and token sent to your email. Please verify to complete signup.' });
  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Verify OTP and complete signup
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    // Verify the OTP
    const storedData = otpStore[email];
    if (!storedData || storedData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Create the user
    const newUser = await User.query().insert({
      email,
      password: storedData.password,
      firstname: storedData.firstname,
      lastname: storedData.lastname,
      phone_number: storedData.phone_number,
    });

    // Cleanup: Remove the OTP from the store
    delete otpStore[email];

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error in verify-otp route:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;