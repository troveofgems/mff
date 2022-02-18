const
  {createHandler} = require("./handlers/create"),
  {readHandler} = require("./handlers/read"),
  {readByIdHandler} = require("./handlers/readById"),
  {updateHandler} = require("./handlers/update"),
  {deleteHandler} = require("./handlers/delete");

module.exports.sanityCheckController = (() => {
  return {
    createSanityCheck: createHandler,
    readSanityChecks: readHandler,
    readSanityCheckById: readByIdHandler,
    updateSanityCheckById: updateHandler,
    deleteSanityCheckById: deleteHandler
  };
})();