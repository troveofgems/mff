// @desc  Get A Sanity Check By Id
// @route GET /api/vX/sanityChecks/:id
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.readByIdHandler = (req, res, next) => {
  let body = buildAPIBodyResponse('GET /sanityChecks/:id');

  // Mutate the body prior to sending back

  return res
    .status(200)
    .json(Object.freeze(body));
}