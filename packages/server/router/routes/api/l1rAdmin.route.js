const
  {
    serveSanityCheck,
    getAllOrders, reviewInvoice, markOrderShipped, cancelOrder,
    getAllProducts,
  } = require('../../../controllers/api/admin/index').adminController.adminOrderList,
  {
    getAllUsers, getUserById
  } = require('../../../controllers/api/admin/index').adminController.adminUserList,
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(serveSanityCheck);

// ORDERS
router
  .route('/orders')
  .get(getAllOrders);

router
  .route('/orders/cancel/:id')
  .put(cancelOrder);

router
  .route('/orders/invoice/:id')
  .get(reviewInvoice);

router
  .route('/orders/markShipped/:id')
  .put(markOrderShipped);

// PRODUCTS
router
  .route('/products')
  .get(getAllProducts);
// USERS
router
  .route('/users')
  .get(getAllUsers);

router
  .route('/users/:id')
  .get(getUserById);

module.exports = router;