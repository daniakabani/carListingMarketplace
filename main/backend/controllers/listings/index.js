const ListingsService = require('daniakabani/services/listings'),
  { schemaValidator } = require('daniakabani/helpers'),
  {
    getByID: listingsGetByIDSchema,
    getAll: listingsGetAllSchema,
    create: listingsCreateSchema,
    update: listingsUpdateSchema,
    delete: listingsDeleteSchema
  } = require('daniakabani/schemas/listings');

exports.getAll = async (req, res) => {
  const { include } = req.query;
  await schemaValidator(listingsGetAllSchema, req.params);
  let getAllListings = await ListingsService.getAll({
    include
  });
  res.status(200);
  return getAllListings;
};

exports.create = async (req, res) => {
  const { start_at = null, end_at = null, car_id = null } = req.body;
  await schemaValidator(listingsCreateSchema, req.body)
  let createListing = await ListingsService.create({
    start_at,
    end_at,
    car_id,
  });
  res.status(201);
  return createListing;
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(listingsGetByIDSchema, req.params)
  let getListingByID = await ListingsService.getByID({
    id
  });
  res.status(200);
  return getListingByID;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(listingsUpdateSchema, req.params)
  const { start_at = null, end_at = null, car_id = null } = req.body;
  let updateListing = await ListingsService.update({
    id,
    start_at,
    end_at,
    car_id
  });
  res.status(200);
  return updateListing;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(listingsDeleteSchema, req.params)
  await ListingsService.delete({ id });
  res.status(200);
  return {
    status: "success",
    message: "successfully deleted car"
  };
}