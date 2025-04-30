const express = require('express');
const signupRoutes = require('./signup'); // Import the signup routes
const signinRoutes = require('./signin'); // Import the signin routes

const router = express.Router();

// Use the signup and signin routes
router.use('/signup', signupRoutes);
router.use('/signin', signinRoutes);

module.exports = router;