const Model = require('./');

class Cars extends Model {
  static tableName = 'cars';

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
    const User = require('./users');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'cars.id',
          to: 'users.car_id'
        }
      }
    }
  }

}

module.exports = Cars;