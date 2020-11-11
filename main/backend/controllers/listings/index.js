const ListingsService = require('daniakabani/services/listings');

exports.getAll = async (req, res) => {
  const { include } = req.params;
  let getAllListings = await ListingsService.getAll({
    include
  });
  res.status(200);
  return getAllListings;
};

exports.create = async (req, res) => {
  const { start_at = null, end_at = null, user_id = null } = req.body;
  let createListing = await ListingsService.create({
    start_at,
    end_at,
    user_id,
  });
  res.status(201);
  return createListing;
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  let getListingByID = await ListingsService.getByID({
    id
  });
  res.status(200);
  return getListingByID;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { start_at = null, end_at = null, user_id = null } = req.body;
  let updateListing = await ListingsService.update({
    id,
    start_at,
    end_at,
    user_id
  });
  res.status(200);
  return updateListing;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await ListingsService.delete({ id });
  res.status(200);
  return "successfully deleted car";
}