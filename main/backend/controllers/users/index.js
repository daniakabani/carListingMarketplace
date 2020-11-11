const UsersService = require('daniakabani/services/users');

exports.getAll = async (req, res) => {
  const { include } = req.query;
  let getAllUsers = await UsersService.getAll({
    include
  });
  res.status(200);
  return getAllUsers;
};

exports.create = async (req, res) => {
  const { name = null, tag = null, role = null, car_id = null } = req.body;
  let createUser = await UsersService.create({
    name,
    tag,
    role,
    car_id
  });
  res.status(201);
  return createUser
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  const { include } = req.query;
  let getUserByID = await UsersService.getByID({
    id,
    include
  });
  res.status(200);
  return getUserByID;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name = null, tag = null, role = null, car_id = null } = req.body;
  let updateUser = await UsersService.update({
    id,
    name,
    tag,
    role,
    car_id
  });
  res.status(200);
  return updateUser;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  let deleteUser = await UsersService.delete({ id });
  res.status(200);
  return deleteUser;
}