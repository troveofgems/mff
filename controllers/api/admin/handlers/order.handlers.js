const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const Order = require('../../../../db/models/Order');
const {sendEmail} = require("../../../../lib/email/sendEmail.routine");

// @desc  Serve Route Sanity Check
// @route GET /api/vX/authentorization/authentication
// @access PRIVATE/ADMIN
const serveSanityCheck = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin');
  return res
    .status(200)
    .json(response);
});

// @desc  Retrieves All Orders From DB
// @route GET /api/vX/l1rAdmin/orders
// @access PRIVATE/ADMIN
const getAllOrders = asyncHandler(async (req, res) => {
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
const reviewInvoice = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/invoice/:id');

  response.data = await Order.findById(req.params.id).populate('user');
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Marks An Order Shipped
// @route PUT /api/vX/l1rAdmin/orders/markShipped/:id
// @access PRIVATE/ADMIN
const markOrderShipped = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/markShipped/:id');

  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  response.data = order;
  response.success = true;

  // Send Order Cancelled Email Here
  sendEmail("orderShipped", order).then(() => {});

  return res
    .status(204)
    .json(response);
});

// @desc  Marks An Order Delivered
// @route PUT /api/vX/l1rAdmin/orders/markDelivered/:id
// @access PRIVATE/ADMIN
const markOrderDelivered = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/markDelivered/:id');

  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  response.data = order;
  response.success = true;

  // Send Order Delivered Email Here
  sendEmail("orderDelivered", order).then(() => {});

  return res
    .status(204)
    .json(response);
});

// @desc  Marks An Order Refunded
// @route PUT /api/vX/l1rAdmin/orders/markRefunded/:id
// @access PRIVATE/ADMIN
const markOrderRefunded = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/markRefunded/:id');

  let order = await Order.findByIdAndUpdate(req.params.id, req.body);
  response.data = order;
  response.success = true;

  // Send Order Delivered Email Here
  sendEmail("orderRefunded", order).then(() => {});

  return res
    .status(204)
    .json(response);
});

// @desc  Cancels Order
// @route PUT /api/vX/l1rAdmin/orders/cancel/:id
// @access PRIVATE/ADMIN
const cancelOrder = asyncHandler(async (req, res) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/cancel/:id');

  await Order.findByIdAndUpdate(req.params.id, req.body);
  response.success = true;

  // Send Order Cancelled Email Here
  let orderDetails = await Order.findById(req.params.id).populate('user');
  sendEmail("orderCancelled", orderDetails).then(() => {});

  return res
    .status(204)
    .json(response);
});

module.exports.adminOrderController = {
  serveSanityCheck,
  getAllOrders,
  reviewInvoice,
  markOrderShipped,
  markOrderDelivered,
  markOrderRefunded,
  cancelOrder
};