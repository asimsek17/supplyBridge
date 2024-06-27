const Joi = require('joi');

const validateCreate = (data) => {
  const schema = Joi.object({
    origin: Joi.string().trim().required().messages({
      'string.base': 'Origin must be a string.',
      'string.empty': 'Origin is required.'
    }),
    maker: Joi.string().trim().required().messages({
      'string.base': 'Maker must be a string.',
      'string.empty': 'Maker is required.'
    }),
    brand: Joi.string().trim().required().messages({
      'string.base': 'Brand must be a string.',
      'string.empty': 'Brand is required.'
    }),
    IDOEM: Joi.string().trim().required().messages({
      'string.base': 'IDOEM must be a string.',
      'string.empty': 'IDOEM is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const validateUpdate = (data) => {
  const schema = Joi.object({
    origin: Joi.string().trim().messages({
      'string.base': 'Origin must be a string.'
    }),
    maker: Joi.string().trim().messages({
      'string.base': 'Maker must be a string.'
    }),
    brand: Joi.string().trim().messages({
      'string.base': 'Brand must be a string.'
    }),
    IDOEM: Joi.string().trim().messages({
      'string.base': 'IDOEM must be a string.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreate,
  validateUpdate
};
