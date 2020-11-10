const UsersService = require('daniakabani/services/users');

exports.getAll = async (req, res) => {
  try {
    let result = await UsersService.getAll();
    res.status(200);
    res.send(result);
  } catch (e) {
    throw e;
  }
};