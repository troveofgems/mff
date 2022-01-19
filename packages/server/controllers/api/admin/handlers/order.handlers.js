// TODO: Comeback and parse this file.
const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const Order = require('../../../../db/models/Order');
const Product = require('../../../../db/models/Product');
const User = require('../../../../db/models/Users');

// @desc  Serve Route Sanity Check
// @route GET /api/vX/authentorization/authentication
// @access PRIVATE/ADMIN
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin');
  return res
    .status(200)
    .json(response);
});

// @desc  Retrieves All Orders From DB
// @route GET /api/vX/l1rAdmin/orders
// @access PRIVATE/ADMIN
const getAllOrders = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders');

  let orders = await Order.find();
  response.data = orders;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Retrieves Order Details For Invoice Viewing
// @route GET /api/vX/l1rAdmin/orders/invoice/:id
// @access PRIVATE/ADMIN
const reviewInvoice = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/invoice/:id');

  response.data = await Order.findById(req.params.id);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Marks Order By Id Shipped
// @route PUT /api/vX/l1rAdmin/orders/markShipped/:id
// @access PRIVATE/ADMIN
const markOrderShipped = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/markShipped/:id');

  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  response.data = order;
  response.success = true;

  return res
    .status(204)
    .json(response);
});

// @desc  Cancels Order By Id
// @route PUT /api/vX/l1rAdmin/orders/cancel/:id
// @access PRIVATE/ADMIN
const cancelOrder = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/cancel/:id');

  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  response.data = order;
  response.success = true;

  return res
    .status(204)
    .json(response);
});

// @desc  Get All Products
// @route GET /api/vX/l1rAdmin/products
// @access PRIVATE/ADMIN
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
  reviewInvoice,
  markOrderShipped,
  cancelOrder,



  getAllProducts,
  getAllUsers,
};