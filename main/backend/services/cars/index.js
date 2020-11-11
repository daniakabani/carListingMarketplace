const CarsModel = require('daniakabani/models/cars'),
  { randomGenerator } = require('daniakabani/helpers')

exports.getAll = ({ include }) => {
  return CarsModel.query()
    .allowGraph('[user]')
    .withGraphFetched(include)
    .whereNull('cars.deleted_at');
};

exports.getByID = ({ id }) => {
  return CarsModel.query()
    .allowGraph('[user]')
    .withGraphFetched('user')
    .findById(id)
    .whereNull('cars.deleted_at')
    .throwIfNotFound();
};

exports.create = ({ brand, model, year, day_price, featured, geo_location }) => {
  return CarsModel.query()
    .insert({
      brand,
      model,
      year,
      day_price,
      featured,
      geo_location
    });
};

exports.delete = async ({ id }) => {
  const user = await CarsModel.query().whereNull('cars.deleted_at').findById(id).throwIfNotFound();
  return CarsModel.query()
    .whereNull('users.deleted_at')
    .findById(id)
    .patch({
      name: `${user.name}_DELETED_${await randomGenerator()}`,
      deleted_at: new Date()
    });
};

exports.update = ({ id, brand, model, year, day_price, featured, geo_location }) => {
  return CarsModel.query()
    .whereNull('cars.deleted_at')
    .patchAndFetchById(id, {
      brand,
      model,
      year,
      day_price,
      featured,
      geo_location
    })
    .throwIfNotFound();
};