const ListingsModel = require('daniakabani/models/listings');

exports.getAll = ({ include, page, page_size }) => {
  let result =  ListingsModel.query()
    .allowGraph('[car]')
    .withGraphFetched(include)
    .whereNull('listings.deleted_at');
  result.orderBy('id', 'asc');
  result.page(Number(page) - 1, page_size);
  return result;
};

exports.getByID = ({ id }) => {
  return ListingsModel.query()
    .allowGraph('[car]')
    .withGraphFetched('car')
    .findById(id)
    .whereNull('listings.deleted_at')
    .throwIfNotFound();
};

exports.create = ({ end_at, start_at, car_id }) => {
  return ListingsModel.query()
    .insert({
      car_id,
      start_at,
      end_at
    });
};

exports.delete = async ({ id }) => {
  await ListingsModel.query().whereNull('listings.deleted_at').findById(id).throwIfNotFound();
  return ListingsModel.query()
    .whereNull('listings.deleted_at')
    .findById(id)
    .patch({
      deleted_at: new Date()
    });
};

exports.update = ({ id, car_id, start_at, end_at }) => {
  return ListingsModel.query()
    .whereNull('listings.deleted_at')
    .patchAndFetchById(id, {
      car_id,
      start_at,
      end_at
    })
    .throwIfNotFound();
};