const CarsService = require('daniakabani/services/cars'),
  {
    create: carCreateSchema,
    getByID: carGetByIDSchema,
    getAll: carGetAllSchema,
    update: carUpdateSchema,
    delete: carDeleteSchema
  } = require('daniakabani/schemas/cars'),
  { schemaValidator } = require('daniakabani/helpers');

exports.getAll = async (req, res) => {
  const { page_size: pageSize, page: pageNumber, brand } = req.query;
  await schemaValidator(carGetAllSchema, req.query);
  let getAllCars = await CarsService.getAll({
    page_size: pageSize,
    page: pageNumber,
    brand
  });
  res.status(200);
  return {
    ...getAllCars,
    total: getAllCars.total,
    page_size: pageSize,
    page: pageNumber,
    page_count: Math.ceil(getAllCars.total / pageSize)
  };
};

exports.create = async (req, res) => {
  const { brand = null, model = null, year = null, day_price = null, featured = null, geo_location = null, user_id = null } = req.body;
  await schemaValidator(carCreateSchema, req.body);
  let createCar = await CarsService.create({
    brand,
    model,
    year,
    day_price,
    featured,
    geo_location,
    user_id
  });
  res.status(201);
  return createCar
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(carGetByIDSchema, req.params);
  let getCarByID = await CarsService.getByID({
    id
  });
  res.status(200);
  return getCarByID;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { brand = null, model = null, year = null, day_price = null, featured = null, geo_location = null, user_id = null } = req.body;
  await schemaValidator(carUpdateSchema, {
    ...req.params,
    ...req.body
  });
  let updateCar = await CarsService.update({
    id,
    brand,
    model,
    year,
    day_price,
    featured,
    geo_location,
    user_id
  });
  res.status(200);
  return updateCar;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(carDeleteSchema, req.params);
  await CarsService.delete({ id });
  res.status(200);
  return "successfully deleted car";
}