const sendTokenEmail = require('./utils/mailer');

(async () => {
  try {
    await sendTokenEmail('recipient@example.com', 'test-token');
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
})();