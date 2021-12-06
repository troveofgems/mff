const
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
  const product = await Product.findById();
  console.log(product);

  body.success = true;
  body.data = product;

  return res
    .status(200)
    .json(Object.freeze(body));
});