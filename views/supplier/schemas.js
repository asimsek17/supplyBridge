const Joi = require('joi');

const validateCreate = (data) => {
  const schema = Joi.object({
    shortName: Joi.string().trim().required().messages({
      'string.base': 'ShortName must be a string.',
      'string.empty': 'ShortName is required.'
    }),
    longName: Joi.string().trim().required().messages({
      'string.base': 'LongName must be a string.',
      'string.empty': 'LongName is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const validateUpdate = (data) => {
  const schema = Joi.object({
    shortName: Joi.string().trim().messages({
      'string.base': 'ShortName must be a string.'
    }),
    longName: Joi.string().trim().messages({
      'string.base': 'LongName must be a string.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreate,
  validateUpdate
};
