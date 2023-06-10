const express = require('express');
const {
  index, show, store, update, deleteById,
} = require('./controller');
const {
  canRead, canStore, canUpdate, canDeleteById,
} = require('./policies');

const router = express.Router();

router.get('/blog-categories/', canRead, index);
router.get('/blog-categories/:id', canRead, show);
router.post('/blog-categories/', canStore, store);
router.put('/blog-categories/:id', canUpdate, update);
router.delete('/blog-categories/:id', canDeleteById, deleteById);

module.exports = router;
