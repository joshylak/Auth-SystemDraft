const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users'; // Name of your database table
  }

  static get idColumn() {
    return 'id'; // Primary key column
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'firstname', 'lastname', 'phone_number'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        phone_number: { type: 'string' },
      },
    };
  }
}

module.exports = User;