// @desc  POST Create A SanityCheck
// @route POST /api/vX/sanityChecks
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.createHandler = (req, res, next) => {
  let body = buildAPIBodyResponse('POST /sanityChecks');

  // Create The Check Then Send Data Back

  return res
    .status(201)
    .json(Object.freeze(body));
};