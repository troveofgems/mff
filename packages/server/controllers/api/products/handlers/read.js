const
  asyncHandler = require('express-async-handler'),
  Product = require('../../../../db/models/Product');

// @desc  Get All Products
// @route GET /api/vX/products
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.readHandler = asyncHandler(async (req, res, next) => {
  let body = buildAPIBodyResponse('GET /product');

  // Mutate the body prior to sending back
  const productList = await Product.find({publishedToShop: true});

  body.success = true;
  body.data = productList;
  body.dataCount = productList.length;

  return res
    .status(200)
    .json(Object.freeze(body));
});