// TODO: Comeback and parse this file.
const {asyncHandler} = require("../../../../middleware/Helpers/async-handler.middleware");
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
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

module.exports.adminUserController = {
  serveSanityCheck,
  getAllUsers,
  getUserById
};