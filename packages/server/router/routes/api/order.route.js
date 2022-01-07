const
  {
    serveSanityCheck, createOrder, getUserOrders, getUserOrderById
  } = require('../../../controllers/api/orders/index').orderController.orders,
  {
    protect
  } = require('../../../middleware/Helpers/route-authentication.middleware'),
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(serveSanityCheck)
  .post(createOrder);

router
  .route('/myOrders')
  .get(protect, getUserOrders);

router
  .route(`/myOrders/invoice/:id`)
  .get(protect, getUserOrderById);

module.exports = router;