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
  const loginSchema = {
    email: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  };

  return Joi.validate(data, loginSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
