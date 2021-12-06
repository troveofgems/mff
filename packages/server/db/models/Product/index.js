const
  MODEL_NAME = 'Product',
  mongoose = require('mongoose'),
  schema 	 = require('./schema/product.schema');

module.exports = mongoose.model(MODEL_NAME, schema);