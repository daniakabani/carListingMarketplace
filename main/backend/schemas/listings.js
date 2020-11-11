const joi = require('@hapi/joi');

exports.create = {
  schema: () => {
    return joi.object().keys({
      car_id: joi.number().positive().required(),
      start_at: joi.date().required(),
      end_at: joi.date().required()
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

exports.update = {
  schema: () => {
    return joi.object().keys({
      car_id: joi.number().positive().optional(),
      start_at: joi.date().optional(),
      end_at: joi.date().optional(),
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

exports.getAll = {
  schema: () => {
    return joi.object().keys({
      include: joi.string().valid('car').optional()
    })
  }
}