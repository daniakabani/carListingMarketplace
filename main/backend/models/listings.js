const Model = require('./base');

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
    const Car = require('./cars');
    return {
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: Car,
        join: {
          from: 'listings.car_id',
          to: 'cars.id'
        }
      }
    }
  }
}

module.exports = Listings;