const
  { adminOrderController } = require("./handlers/order.handlers");

module.exports.adminOrderController = (() => {
  return {
    adminOrderList: adminOrderController
  };
})();