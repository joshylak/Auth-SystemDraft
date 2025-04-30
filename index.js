require('dotenv').config();
require('./db'); // Initialize database connection
const app = require('./app'); // Import the Express app

// Define the port
const PORT = 5000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});