const
  MODEL_NAME = 'User',
  mongoose = require('mongoose'),
  schema 	 = require('./schema/user.schema');

module.exports = mongoose.model(MODEL_NAME, schema);