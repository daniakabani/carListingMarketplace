const CarsService = require('daniakabani/services/cars');

exports.getAll = async (req, res) => {
  const { include } = req.query;
  let getAllCars = await CarsService.getAll({
    include
  });
  res.status(200);
  return getAllCars;
};

exports.create = async (req, res) => {
  const { brand = null, model = null, year = null, day_price = null, featured = null, geo_location = null } = req.body;
  let createCar = await CarsService.create({
    brand,
    model,
    year,
    day_price,
    featured,
    geo_location
  });
  res.status(201);
  return createCar
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  let getCarByID = await CarsService.getByID({
    id
  });
  res.status(200);
  return getCarByID;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { brand = null, model = null, year = null, day_price = null, featured = null, geo_location = null } = req.body;
  let updateCar = await CarsService.update({
    id,
    brand,
    model,
    year,
    day_price,
    featured,
    geo_location
  });
  res.status(200);
  return updateCar;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await CarsService.delete({ id });
  res.status(200);
  return "successfully deleted car";
}