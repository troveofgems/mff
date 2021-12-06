const
  {
    getAllProducts, getProductById
  } = require('../../../controllers/api/products').productController,
  express = require('express'),
  router = express.Router();

console.log('Inside Product Routes', getAllProducts);
router
  .route('/')
  .get(getAllProducts);
/*  .post(createSanityCheck); */

router
  .route('/:id')
  .get(getProductById)
  /*.put(updateSanityCheckById)
  .delete(deleteSanityCheckById)*/

module.exports = router;