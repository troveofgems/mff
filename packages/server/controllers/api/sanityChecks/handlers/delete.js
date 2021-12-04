// @desc  Get All Sanity Checks
// @route GET /api/vX/sanityChecks
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.deleteHandler = (req, res, next) => {
  let body = buildAPIBodyResponse('DELETE /sanityChecks/:id');

  // Mutate the body prior to sending back

  return res
    .status(200)
    .json(Object.freeze(body));
};