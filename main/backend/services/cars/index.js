const CarsModel = require('daniakabani/models/cars'),
  { randomGenerator } = require('daniakabani/helpers')

exports.getAll = ({ include, page, page_size, brand }) => {
  let result =  CarsModel.query()
    .allowGraph('[user]')
    .withGraphFetched(include)
    .whereNull('cars.deleted_at');
  brand && result.where('brand', 'ilike', brand);
  result.orderBy('id', 'asc');
  result.page(Number(page) - 1, page_size);
  return result;
};

exports.getByID = ({ id }) => {
  return CarsModel.query()
    .allowGraph('[user]')
    .withGraphFetched('user')
    .findById(id)
    .whereNull('cars.deleted_at')
    .throwIfNotFound();
};

exports.create = ({ brand, model, year, day_price, featured, geo_location, user_id }) => {
  return CarsModel.query()
    .insert({
      brand,
      model,
      year,
      day_price,
      featured,
      geo_location: JSON.stringify(geo_location),
      user_id
    });
};

exports.delete = async ({ id }) => {
  await CarsModel.query().whereNull('cars.deleted_at').findById(id).throwIfNotFound();
  return CarsModel.query()
    .whereNull('cars.deleted_at')
    .findById(id)
    .patch({
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
      geo_location: JSON.stringify(geo_location)
    })
    .throwIfNotFound();
};