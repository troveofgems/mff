const
  {
    serveSanityCheck, getAllOrders, getAllProducts, getAllUsers
  } = require('../../../controllers/api/admin/index').adminOrderController.adminOrderList,
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(serveSanityCheck);

router
  .route('/orders')
  .get(getAllOrders);

router
  .route('/products')
  .get(getAllProducts);

router
  .route('/users')
  .get(getAllUsers);

module.exports = router;