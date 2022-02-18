// @desc  Update A Sanity Check By Id
// @route PUT /api/vX/sanityChecks/:id
// @access PUBLIC
const {buildAPIBodyResponse} = require("../../../../utils/dev/controller.utils");
module.exports.updateHandler = (req, res, next) => {
  let body = buildAPIBodyResponse('PUT /sanityChecks/:id');

  // Mutate the body prior to sending back

  return res
    .status(200)
    .json(Object.freeze(body));
};