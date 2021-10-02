const Model = require('./base');

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
    const user = require('./users');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: user,
        join: {
          from: 'cars.user_id',
          to: 'users.id'
        }
      }
    }
  }

}

module.exports = Cars;