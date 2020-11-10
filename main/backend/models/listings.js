const Model = require('./');

class Listings extends Model {
  static tableName = 'listings';

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
          from: 'listings.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Listings;