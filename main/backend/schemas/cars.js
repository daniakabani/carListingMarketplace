const joi = require('@hapi/joi');

exports.create = {
  schema: () => {
    return joi.object().keys({
      brand: joi.string().max(255).required(),
      model: joi.string().max(255).required(),
      year: joi.number().positive(),
      day_price: joi.number().positive(),
      featured: joi.boolean(),
      geo_location: joi.object().keys({
        lat: joi.number(),
        lng: joi.number()
      }),
      user_id: joi.number().positive().required()
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
      brand: joi.string().max(255).required(),
      model: joi.string().max(255).required(),
      year: joi.number().positive(),
      day_price: joi.number().positive(),
      featured: joi.boolean(),
      geo_location: joi.object().keys({
        lat: joi.number(),
        lng: joi.number()
      }),
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
      brand: joi.string().optional().allow(''),
      page: joi.number().positive().optional().allow(''),
      page_size: joi.number().positive().optional()
    })
  }
}