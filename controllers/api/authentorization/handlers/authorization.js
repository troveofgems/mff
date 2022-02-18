const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");

const { asyncHandler } = require('../../../../middleware/Helpers/async-handler.middleware');

// @desc  Serve Route Sanity Check
// @route GET /api/vX/authentorization/authorization
// @access PUBLIC
const serveSanityCheck = asyncHandler(async (req, res, next) => {
  let response = buildAPIBodyResponse('/authorization');
  return res
    .status(200)
    .json(response);
});

module.exports.authorizationController = {
  serveSanityCheck
};