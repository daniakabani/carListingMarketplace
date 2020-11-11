const UsersModel = require('daniakabani/models/users'),
  bcrypt = require('bcrypt'),
  { randomGenerator } = require('daniakabani/helpers');

exports.getAll = () => {
  return UsersModel.query()
    .allowGraph('role')
    .withGraphFetched('role')
    .whereNull('users.deleted_at');
};

exports.getByID = ({ id }) => {
  return UsersModel.query()
    .allowGraph('role')
    .withGraphFetched('role')
    .findById(id)
    .whereNull('users.deleted_at')
    .throwIfNotFound();
};

exports.create = async ({ username, role_id, tag, password }) => {
  let hashedPassword = await bcrypt.hashSync(password, 6);
  return UsersModel.query()
    .insert({
      username,
      password: hashedPassword,
      role_id,
      tag
    });
};

exports.login = async ({ username, password }) => {
  let user = await UsersModel.query().whereNull('users.deleted_at').where('username', username).throwIfNotFound();
  let validatePassword = bcrypt.compareSync(password, user[0].password);
  if (validatePassword) {
    return true;
  } else {
    throw {
      errorCode: "unauthorised",
      status: 403,
      message: 'Invalid credentials provided, please try again'
    }
  }
}

exports.delete = async ({ id }) => {
  const user = await UsersModel.query().whereNull('users.deleted_at').findById(id).throwIfNotFound();
  return UsersModel.query()
    .whereNull('users.deleted_at')
    .findById(id)
    .patch({
      username: `${user.username}_DELETED_${await randomGenerator()}`,
      deleted_at: new Date()
    });
};

exports.update = ({ id, username, role_id, tag }) => {
  return UsersModel.query()
    .whereNull('users.deleted_at')
    .patchAndFetchById(id, {
      username,
      role_id,
      tag,
    })
    .throwIfNotFound();
};