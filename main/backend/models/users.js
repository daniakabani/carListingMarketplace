const Model = require('./base');

class Users extends Model {
  static tableName = 'users';

  static getTableName() {
    return this.tableName;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    const Car = require('./cars'),
      Role = require('./roles');
    return {
      car: {
        relation: Model.HasManyRelation,
        modelClass: Car,
        join: {
          from: 'users.car_id',
          to: 'cars.id'
        }
      },
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id'
        }
      }
    }
  }
}

module.exports = Users;