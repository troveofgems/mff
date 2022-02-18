const
  asyncHandler = require('express-async-handler'),
  Product = require('../../../../db/models/Product'),
  { buildAPIBodyResponse } = require("../../../../utils/dev/controller.utils");

// @desc  Get All Products
// @route GET /api/vX/products
// @access PUBLIC
module.exports.readHandler = asyncHandler(async (req, res, next) => {
  let
    body = buildAPIBodyResponse('GET /product'),
    filter = {publishedToShop: true};

  if (req.query) {
    let regQuery = req.query.keyword || "";
    filter.name = {
      $regex: regQuery,
      $options: 'i'
    };
  }

  console.log("TEST AFTER ADV RESULTS", res.advancedResults);

  const productList = await Product.find(filter);

  body.success = true;
  body.data = productList;
  body.dataCount = productList.length;
  body.advancedResults = res.advancedResults;

  return res
    .status(200)
    .json(Object.freeze(body));
});

// @desc  Get Top Products For Carousel
// @route GET /api/vX/product/top
// @access PUBLIC
module.exports.readTopProductsHandler = asyncHandler(async (req, res, next) => {
  let
    body = buildAPIBodyResponse('GET /product/top'),
    filter = {publishedToShop: true};

  const productList = await Product
    .find(filter)
    .sort({ rating: -1 })
    .limit(3);

  body.success = true;
  body.data = productList;

  return res
    .status(200)
    .json(Object.freeze(body));
});