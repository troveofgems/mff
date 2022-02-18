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
const {apiAdvancedResultsFilter} = require("../../../middleware/Helpers/api-advanced-results-filter.middleware");
const Product = require('../../../db/models/Product');

router
  .route('/')
  .get(apiAdvancedResultsFilter(Product, null, false), getAllProducts);

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