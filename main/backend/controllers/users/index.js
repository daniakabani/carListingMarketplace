const UsersService = require('daniakabani/services/users');

exports.getAll = async (req) => {
  const { include } = req.query;
  return UsersService.getAll({
    include
  });
};

exports.create = async (req) => {
  const { name = null, tag = null, role = null, car_id = null } = req.body;
  return UsersService.create({
    name,
    tag,
    role,
    car_id
  });
};

exports.getByID = async (req) => {
  const { id } = req.params;
  const { include } = req.query;
  return UsersService.getByID({
    id,
    include
  });
};

exports.update = async (req) => {
  const { id } = req.params;
  const { name = null, tag = null, role = null, car_id = null } = req.body;
  return UsersService.update({
    id,
    name,
    tag,
    role,
    car_id
  });
};

exports.delete = async (req) => {
  const { id } = req.params;
  return UsersService.delete({ id });
}