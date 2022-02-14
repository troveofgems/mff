const
  {
    getAllProducts, getProductById, getTopProducts
  } = require('../../../controllers/api/products').productController,
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(getAllProducts);

router
  .route('/top')
  .get(getTopProducts);

router
  .route('/:id')
  .get(getProductById);

module.exports = router;