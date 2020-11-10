const { randomBytes } = require('crypto');

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