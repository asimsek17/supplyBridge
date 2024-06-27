const Joi = require('joi');

const validateCreate = (data) => {
  const schema = Joi.object({
    modelName: Joi.string().trim().required().messages({
      'string.base': 'ModelName must be a string.',
      'string.empty': 'ModelName is required.'
    }),
    type: Joi.string().trim().required().messages({
      'string.base': 'Type must be a string.',
      'string.empty': 'Type is required.'
    }),
    propulsion: Joi.string().trim().required().messages({
      'string.base': 'Propulsion must be a string.',
      'string.empty': 'Propulsion is required.'
    }),
    propulsionType: Joi.string().trim().required().messages({
      'string.base': 'PropulsionType must be a string.',
      'string.empty': 'PropulsionType is required.'
    }),
    productionCountry: Joi.string().trim().required().messages({
      'string.base': 'ProductionCountry must be a string.',
      'string.empty': 'ProductionCountry is required.'
    }),
    modelYear: Joi.number().integer().positive().required().messages({
      'number.base': 'ModelYear must be a number.',
      'number.integer': 'ModelYear must be an integer.',
      'number.positive': 'ModelYear must be a positive number.',
      'any.required': 'ModelYear is required.'
    }),
    productionRegion: Joi.string().trim().required().messages({
      'string.base': 'ProductionRegion must be a string.',
      'string.empty': 'ProductionRegion is required.'
    }),
    oemId: Joi.number().integer().positive().required().messages({
      'number.base': 'OemId must be a number.',
      'number.integer': 'OemId must be an integer.',
      'number.positive': 'OemId must be a positive number.',
      'any.required': 'OemId is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const validateUpdate = (data) => {
  const schema = Joi.object({
    modelName: Joi.string().trim().messages({
      'string.base': 'ModelName must be a string.'
    }),
    type: Joi.string().trim().messages({
      'string.base': 'Type must be a string.'
    }),
    propulsion: Joi.string().trim().messages({
      'string.base': 'Propulsion must be a string.'
    }),
    propulsionType: Joi.string().trim().messages({
      'string.base': 'PropulsionType must be a string.'
    }),
    productionCountry: Joi.string().trim().messages({
      'string.base': 'ProductionCountry must be a string.'
    }),
    modelYear: Joi.number().integer().positive().messages({
      'number.base': 'ModelYear must be a number.',
      'number.integer': 'ModelYear must be an integer.',
      'number.positive': 'ModelYear must be a positive number.'
    }),
    productionRegion: Joi.string().trim().messages({
      'string.base': 'ProductionRegion must be a string.'
    }),
    oemId: Joi.number().integer().positive().messages({
      'number.base': 'OemId must be a number.',
      'number.integer': 'OemId must be an integer.',
      'number.positive': 'OemId must be a positive number.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreate,
  validateUpdate
};
