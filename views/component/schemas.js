const Joi = require("joi");

const validateUpdate = (data) => {
  const schema = Joi.object({
    level0: Joi.string().trim().message("Level0 must be a string."),
    level1: Joi.string().trim().message("Level1 must be a string."),
    categoryL2: Joi.string().trim().message("CategoryL2 must be a string."),
    productL3: Joi.string().trim().message("ProductL3 must be a string."),
    detailsL4: Joi.string().trim().message("DetailsL4 must be a string."),
    modelId: Joi.number()
      .integer()
      .positive()
      .message("ModelId must be a positive integer."),
    supplierId: Joi.number()
      .integer()
      .positive()
      .message("SupplierId must be a positive integer."),
  });

  return schema.validate(data, { abortEarly: false });
};
const validateCreate = (data) => {
  const schema = Joi.object({
    level0: Joi.string().trim().required().messages({
      "string.base": "Level0 must be a string.",
      "string.empty": "Level0 is required.",
    }),
    level1: Joi.string().trim().required().messages({
      "string.base": "Level1 must be a string.",
      "string.empty": "Level1 is required.",
    }),
    categoryL2: Joi.string().trim().required().messages({
      "string.base": "CategoryL2 must be a string.",
      "string.empty": "CategoryL2 is required.",
    }),
    productL3: Joi.string().trim().required().messages({
      "string.base": "ProductL3 must be a string.",
      "string.empty": "ProductL3 is required.",
    }),
    detailsL4: Joi.string().trim().required().messages({
      "string.base": "DetailsL4 must be a string.",
      "string.empty": "DetailsL4 is required.",
    }),
    modelId: Joi.number().integer().positive().required().messages({
      "number.base": "ModelId must be a number.",
      "number.integer": "ModelId must be an integer.",
      "number.positive": "ModelId must be a positive number.",
      "any.required": "ModelId is required.",
    }),
    supplierId: Joi.number().integer().positive().required().messages({
      "number.base": "SupplierId must be a number.",
      "number.integer": "SupplierId must be an integer.",
      "number.positive": "SupplierId must be a positive number.",
      "any.required": "SupplierId is required.",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = {
  validateCreate,
  validateUpdate,
};
