const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
const User = require('../../../../db/models/Users');
const Order = require("../../../../db/models/Order");
const {sendEmail} = require("../../../../lib/email/sendEmail.routine");

const _encryptPassword = async (pwd, uid) => { // TODO: Extricate This Fxn To The Appropriate Helper File
  let user = await User // Search & Update User Data
    .findById(uid);
  user.password = pwd;
  return user.save();
};

// @desc  Serve Route Sanity Check
// @route GET /api/vX/l1rAdmin
// @access PRIVATE/ADMIN
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin');
  return res
    .status(200)
    .json(response);
});

// @desc  Get All Users
// @route GET /api/vX/l1rAdmin/users
// @access PRIVATE
const getAllUsers = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/users');

  response.data = await User.find();
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Get User By Id
// @route GET /api/vX/l1rAdmin/users/:id
// @access PRIVATE
const getUserById = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/users/:id');

  response.data = await User.findById(req.params.id);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Delete User By Id
// @route DELETE /api/vX/l1rAdmin/users/:id
// @access PRIVATE/ADMIN
const deleteUserById = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/users/:id');

  response.data = await User.findByIdAndDelete(req.params.id);
  response.success = true;

  return res
    .status(200)
    .json(response);
});

// @desc  Update The User Profile
// @route PUT /api/vX/l1rAdmin/users/:id
// @access PRIVATE/ADMIN
const updateUserById = asyncHandler(async (req, res, next) => {
  let
    response = buildAPIBodyResponse('/l1rAdmin/l1ra/users/update/:id');

  if(req.body.password) {
    await _encryptPassword(req.body.password, req.body.update_registrationId);
    delete req.body.password;
  }

  response.data = await User // Search & Update User Data
    .findByIdAndUpdate(req.body.update_registrationId, req.body, {upsert: true});

  response.success = true;

  let userUpdated = await User // Search & Update User Data
    .findById(req.body.update_registrationId);

  userUpdated.adminUpdate = true;

  if (req.body.authLevel) {
    // Send Promoted Role Email Here
    sendEmail("rolePromotion", userUpdated).then(() => {});
  } else {
    // Send Admin Updated Account Info Email Here
    sendEmail("accountUpdate", userUpdated).then(() => {});
  }

  return res
    .status(200)
    .json(response);
});

// @desc  Get All Orders Placed By The User - Supplemental Helper
// @route GET /api/vX/l1rAdmin/orders/user/:id
// @access PRIVATE/ADMIN
const getAllOrdersForUserById = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/l1rAdmin/orders/user/:id');

  response.data = await Order.find({user: `${req.params.uid}`});
  response.success = true;

  return res
    .status(200)
    .json(response);
});

module.exports.adminUserController = {
  serveSanityCheck,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllOrdersForUserById
};