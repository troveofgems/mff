const
  {
    getAllProducts, getProductById, getTopProducts
  } = require('../../../controllers/api/products').productController,
  {
    createProductReview
  } = require('../../../controllers/api/authentorization').authentorizationController.authentication,
  express = require('express'),
  router = express.Router();
const {protect} = require("../../../middleware/Helpers/route-authentication.middleware");

router
  .route('/')
  .get(getAllProducts);

router
  .route('/top')
  .get(getTopProducts);

router
  .route('/:id/leaveReview')
  .put(protect, createProductReview);

router
  .route('/:id')
  .get(getProductById);

module.exports = router;