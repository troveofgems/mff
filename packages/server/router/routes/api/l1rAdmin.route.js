const
  {
    serveSanityCheck,
    getAllOrders, reviewInvoice, cancelOrder,
    markOrderShipped, markOrderRefunded, markOrderDelivered
  } = require('../../../controllers/api/admin/index').adminController.adminOrderList,
  {
    getAllUsers, getUserById, deleteUserById, getAllOrdersForUserById, updateUserById
  } = require('../../../controllers/api/admin/index').adminController.adminUserList,
  {
    getAllProducts, getProductById, createProduct, deleteProductById, updateProductById
  } = require('../../../controllers/api/admin/index').adminController.adminProductList,
  {
    protect
  } = require('../../../middleware/Helpers/route-authentication.middleware'),
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(serveSanityCheck);

// ORDERS
router
  .route('/orders')
  .get(protect, getAllOrders);

router
  .route('/orders/cancel/:id')
  .put(protect, cancelOrder);

router
  .route('/orders/invoice/:id')
  .get(protect, reviewInvoice);

router
  .route('/orders/markDelivered/:id')
  .put(protect, markOrderDelivered);

router
  .route('/orders/markRefunded/:id')
  .put(protect, markOrderRefunded);

router
  .route('/orders/markShipped/:id')
  .put(protect, markOrderShipped);

router
  .route('/orders/user/:uid')
  .get(protect, getAllOrdersForUserById);

// PRODUCTS
router
  .route('/products')
  .get(protect, getAllProducts)
  .post(protect, createProduct);

router
  .route('/products/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

// USERS
router
  .route('/users')
  .get(getAllUsers);

router
  .route('/users/:id')
  .get(getUserById)
  .put(protect, updateUserById)
  .delete(deleteUserById);

module.exports = router;