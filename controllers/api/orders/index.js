const
  { orderController } = require("./handlers/order");

module.exports.orderController = (() => {
  return {
    orders: orderController
  };
})();