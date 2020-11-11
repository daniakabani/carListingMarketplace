const UsersModel = require('daniakabani/models/users'),
  { randomGenerator } = require('daniakabani/helpers')

exports.getAll = () => {
  return UsersModel.query()
    .whereNull('users.deleted_at');
};

exports.getByID = ({ id }) => {
  return UsersModel.query()
    .findById(id)
    .whereNull('users.deleted_at')
    .throwIfNotFound();
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
  const user = await UsersModel.query().whereNull('users.deleted_at').findById(id).throwIfNotFound();
  return UsersModel.query()
    .whereNull('users.deleted_at')
    .findById(id)
    .patch({
      name: `${user.name}_DELETED_${await randomGenerator()}`,
      deleted_at: new Date()
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
    .throwIfNotFound();
};