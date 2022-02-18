const { Joi } = require('express-validation');

// Register User Validation Schema
module.exports.registerUserValidation = {
  body: Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    currentEmail: Joi.string()
      .email()
      .required(),
    birthMonth: Joi.string()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{8,32}/)
      .required()
  })
};

// Login User Validation Schema
module.exports.loginUserValidation = {
  body: Joi.object({
    currentEmail: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{8,32}/)
      .required()
  })
};

// Forgotten Password Request Validation Schema
module.exports.forgottenPasswordRequestValidation = {
  body: Joi.object({
    currentEmail: Joi.string()
      .email()
      .required()
  })
};
