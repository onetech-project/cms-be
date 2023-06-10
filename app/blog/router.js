const express = require('express');
const { validate } = require('express-validation');
const {
  index, show, store, update, deleteById,
} = require('./controller');
const {
  canRead, canStore, canUpdate, canDeleteById,
} = require('./policies');
const { file, form } = require('./validation');

const router = express.Router();

router.get('/blog/', canRead, index);
router.get('/blog/:id', canRead, show);
router.post('/blog/', canStore, validate(form, {}, { abortEarly: false }), file, store);
router.put('/blog/:id', canUpdate, validate(form, {}, { abortEarly: false }), file, update);
router.delete('/blog/:id', canDeleteById, deleteById);

module.exports = router;
