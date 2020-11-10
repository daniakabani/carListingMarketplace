const UsersModel = require('daniakabani/models/users'),
  { randomGenerator } = require('daniakabani/helpers')

exports.getAll = ({ include }) => {
  return UsersModel.query()
    .allowGraph('[car]')
    .withGraphJoined(include)
    .whereNull('users.deleted_at');
};

exports.getByID = ({ id, include }) => {
  return UsersModel.query()
    .allowGraph('[car]')
    .withGraphJoined(include)
    .findById(id)
    .whereNull('users.deleted_at');
};

exports.create = ({ name, role, tag, car_id }) => {
  return UsersModel.query()
    .insert({
      name,
      role,
      tag,
      car_id
    });
};

exports.delete = async ({ id }) => {
  const user = await UsersModels.query().whereNull('users.deleted_at').findById(id);
  return UsersModel.query()
    .whereNull('users.deleted_at')
    .findById(id)
    .patch({
      name: `${user.name}_DELETED_${await randomGenerator()}`,
      deleted_at: Date.now()
    });
};

exports.update = ({ id, name, role, tag, car_id }) => {
  return UsersModel.query()
    .whereNull('users.deleted_at')
    .patchAndFetchById(id, {
      name,
      role,
      tag,
      car_id
    })
};