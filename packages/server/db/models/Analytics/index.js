const
  MODEL_NAME = 'Analytics',
  mongoose = require('mongoose'),
  schema 	 = require('./schema/analytics.schema');

module.exports = mongoose.model(MODEL_NAME, schema);