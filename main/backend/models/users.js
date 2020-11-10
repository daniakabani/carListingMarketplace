const Model = require('./');

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
      listing = require('./listings');
    return {
      car: {
        relation: Model.HasManyRelation,
        modelClass: Car,
        join: {
          from: 'users.car_id',
          to: 'cars.id'
        }
      },
      listing: {
        relation: Model.HasManyRelation,
        modelClass: listing,
        join: {
          from: 'users.listing_id',
          to: 'listings.id'
        }
      }
    }
  }
}

module.exports = Users;