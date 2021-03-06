const
  { adminOrderController } = require("./handlers/order.handlers"),
  { adminProductController } = require("./handlers/product.handlers"),
  { adminUserController } = require("./handlers/user.handlers");

module.exports.adminController = (() => ({
    adminOrderList: adminOrderController,
    adminProductList: adminProductController,
    adminUserList: adminUserController
}))();