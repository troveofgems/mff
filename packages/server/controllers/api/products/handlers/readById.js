const
  ErrorResponse = require('../../../../class/ErrorResponse'),
  asyncHandler = require('express-async-handler'),
  Product = require('../../../../db/models/Product');

// @desc  Get All Products
// @route GET /api/vX/products
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.readByIdHandler = asyncHandler(async (req, res, next) => {
  let body = buildAPIBodyResponse('GET /product/:id');

  // Mutate the body prior to sending back
  console.log('Looking for: ', req.params);
  const product = await Product.findById(req.params.id);

  if (!product) { throw new ErrorResponse('Product Does Not Exist', 200); }

  body.success = true;
  body.data = product;

  return res
    .status(200)
    .json(Object.freeze(body));
});