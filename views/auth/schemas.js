const Joi = require('joi');

const validateCreate = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email().messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email.'
    }),
    password: Joi.string().trim().required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().required().email().messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email.'
    }),
    password: Joi.string().trim().required().messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.'
    })
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = { validateCreate, validateLogin };
