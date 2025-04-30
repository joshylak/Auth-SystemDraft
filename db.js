const { Model } = require('objection');
const Knex = require('knex');
require('dotenv').config();

// Initialize Knex
const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: './migrations',
  },
});

// Bind Objection.js to Knex
Model.knex(knex);

module.exports = knex;