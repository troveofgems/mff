const { Joi } = require('express-validation');

// Register User Validation Schema
module.exports.registerUserValidation = {
  body: Joi.object({
    firstName: Joi.string()
      .required(),
    middleInitial: Joi.string(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{16,32}/)
      .required()
  })
};

// Login User Validation Schema
module.exports.loginUserValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{16,32}/)
      .required()
  })
};

// Forgotten Password Request Validation Schema
module.exports.forgottenPasswordRequestValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required()
  })
};
