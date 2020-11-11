const joi = require('@hapi/joi');

exports.create = {
  schema: () => {
    return joi.object().keys({
      username: joi.string().max(60).required(),
      password: joi.string().max(60).required(),
      role_id: joi.number().positive().required(),
      tag: joi.string().optional()
    });
  }
};

exports.getByID = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required()
    });
  }
};

exports.login = {
  schema: () => {
    return joi.object().keys({
      username: joi.string().max(60).required(),
      password: joi.string().max(60).required(),
    })
  }
}

exports.update = {
  schema: () => {
    return joi.object().keys({
      username: joi.string().max(60).required(),
      role_id: joi.number().positive(),
      tag: joi.array().optional(),
      id: joi.number().positive().required()
    });
  }
};

exports.delete = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required()
    });
  }
}
