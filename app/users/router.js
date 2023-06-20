const express = require('express');
const {
  index, show, store, update, deleteById,
} = require('./controller');
const {
  canRead, canStore, canUpdate, canDeleteById,
} = require('./policies');

const router = express.Router();

router.get('/users/', canRead, index);
router.get('/users/:id', canRead, show);
router.post('/users/', canStore, store);
router.put('/users/:id', canUpdate, update);
router.delete('/users/:id', canDeleteById, deleteById);

module.exports = router;
