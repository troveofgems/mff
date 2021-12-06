const
  {readHandler} = require("./handlers/read"),
  {readByIdHandler} = require("./handlers/readById");

module.exports.productController = (() => {
  return {
    getAllProducts: readHandler,
    getProductById: readByIdHandler
  };
})();