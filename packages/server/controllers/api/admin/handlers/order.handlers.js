const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const Order = require('../../../../db/models/Order');
const Product = require('../../../../db/models/Product');
const User = require('../../../../db/models/Users');


// @desc  Serve Route Sanity Check
// @route GET /api/vX/authentorization/authentication
// @access PRIVATE
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin');
  return res
    .status(200)
    .json(response);
});

// @desc  Get All Orders
// @route GET /api/vX/l1rAdmin/orders
// @access PRIVATE
const getAllOrders = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders');

  let orders = await Order.find();
  response.data = orders;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Get All Products
// @route GET /api/vX/l1rAdmin/products
// @access PRIVATE
const getAllProducts = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/products');

  let products = await Product.find();
  response.data = products;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

module.exports.adminOrderController = {
  serveSanityCheck,
  getAllOrders,
  getAllProducts
};

// @desc  Get All Users
// @route GET /api/vX/l1rAdmin/users
// @access PRIVATE
const getAllUsers = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/users');

  let users = await User.find();
  response.data = users;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

module.exports.adminOrderController = {
  serveSanityCheck,
  getAllOrders,
  getAllProducts,
  getAllUsers
};