const
  {
    createSanityCheck,
    readSanityChecks, readSanityCheckById,
    updateSanityCheckById,
    deleteSanityCheckById
  } = require('../../../controllers/api/sanityChecks').sanityCheckController,
  express = require('express'),
  router = express.Router();

router
  .route('/')
  .get(readSanityChecks)
  .post(createSanityCheck);

router
  .route('/:id')
  .get(readSanityCheckById)
  .put(updateSanityCheckById)
  .delete(deleteSanityCheckById)

module.exports = router;