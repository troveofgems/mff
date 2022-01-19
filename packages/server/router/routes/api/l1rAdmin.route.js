const
  {
    serveSanityCheck,
    getAllOrders, reviewInvoice, markOrderShipped, cancelOrder,
    getAllProducts, getAllUsers
  } = require('../../../controllers/api/admin/index').adminOrderController.adminOrderList,
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

module.exports = router;