const Joi = require("@hapi/joi");

////REGISTER VALIDATIONS
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  const toReturn = schema.validate(data);

  return toReturn;
};

/// Login validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  const toReturn = schema.validate(data);

  return toReturn;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
