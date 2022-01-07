const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const ErrorResponse = require('../../../../middleware/Error').errorHandler;

const Order = require('../../../../db/models/Order');

// @desc  Serve Route Sanity Check
// @route GET /api/vX/order
// @access PUBLIC
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/order');
  return res
    .status(200)
    .json(response);
});

// @desc  Create An Order
// @route POST /api/vX/order
// @access PUBLIC
const createOrder = asyncHandler(async (req, res, next) => {
  const { cartItems, user } = req.body;

  if (cartItems === undefined || cartItems.length === 0) {
    if (cartItems === undefined) { // Server Error
      res.status(500);
      throw new Error('Server Error');
    } else { // User Error
      res.status(400);
      return res.json({
        statusCode: 400,
        overrideErrorFromServer: true,
        overrideFrom: 'order',
        overrideMessage: 'No Items In Your Cart!'
      });
    }
  } else {
    let response = buildAPIBodyResponse('/order');

    response.success = true;
    response.error = null;


    let orderSchema = {...req.body};

    try {
      let order = new Order(orderSchema);
      await order.save()
      response.data = {createdOrder: true};
      return res
        .status(200)
        .json(response);
    } catch (err) {
      console.log('Caught Error ', err);
    }
  }
});

// @desc  Get All Logged In User's Orders
// @route GET /api/vX/order/myOrders
// @access PRIVATE
const getUserOrders = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/order/myOrders');
  let orders = await Order.find({ user: req.user._id });
  response.data = orders;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Get Invoice For Logged In User's Order
// @route GET /api/vX/order/myOrders/invoice/:id
// @access PRIVATE
const getUserOrderById = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/order/myOrders/invoice/:id');
  console.log('Check for user id', req.user._id);
  let order = await Order.findById(req.params.id);
  console.log(order);
  response.data = order;
  response.success = true;

  return res
    .status(200)
    .json(response);
});

module.exports.orderController = {
  serveSanityCheck,
  createOrder,
  getUserOrders,
  getUserOrderById
};