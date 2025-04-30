require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect()
  .then(() => {
    console.log('Database connected successfully!');
    client.end();
  })
  .catch(err => {
    console.error('Database connection failed:', err.stack);
    client.end();
  });