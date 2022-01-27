const
  {
    serveSanityCheck,
    getAllOrders, reviewInvoice, markOrderShipped, cancelOrder,
    getAllProducts
  } = require('../../../controllers/api/admin/index').adminController.adminOrderList,
  {
    getAllUsers, getUserById, deleteUserById, getAllOrdersForUserById, updateUserById
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

router
  .route('/orders/user/:uid')
  .get(getAllOrdersForUserById);

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
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;