exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('firstname').notNullable(); // Add firstname
    table.string('lastname').notNullable();  // Add lastname
    table.string('phone_number').unique().notNullable(); // Add phone_number
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};