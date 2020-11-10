const { randomBytes } = require('crypto'),
  { NotFoundError } = require('objection');

exports.randomGenerator = async (length = 20) => {
  return new Promise((resolve, reject) => {
    try {
      randomBytes(length, function (err, buffer) {
        let random = buffer.toString('hex');
        resolve(random);
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.expressCallback = (controller) => {
  return async (req, res) => {
    try {
      let controllerResponse = await controller(req, res);
      typeof controllerResponse !== typeof undefined && res.send(controllerResponse);
    } catch (e) {
      if (e instanceof NotFoundError) {
        res.status(404).send({
          message: 'unable to find the requested resource, please try again',
          error: e
        })
      }
      else if (e.errorCode) {
        res.status(e.status || 400).send({ error: e });
      } else if (e.data) {
        res.status(400).send(e.data);
      } else if (e.nativeError && e.nativeError.code) {
        console.warn('SQL error');
        console.error(e);
        res.status(409).send({
          message: e.nativeError.detail
        });
      } else {
        console.error(e);
        res.status(500).send({
          message: 'unknown error occurred, contact support'
        });
      }
    }
  };
};