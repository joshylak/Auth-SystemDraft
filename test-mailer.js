const sendTokenEmail = require('./utils/mailer');

(async () => {
  try {
    await sendTokenEmail('adeyemolakin2@gmail.com', 'test-token');
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
})();