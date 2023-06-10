const express = require('express');
const { validate } = require('express-validation');
const {
  index, show, store, update, deleteById,
} = require('./controller');
const {
  canStore, canUpdate, canDeleteById,
} = require('./policies');
const { file, form } = require('./validation');

const router = express.Router();

router.get('/banner/', index);
router.get('/banner/:id', show);
router.post('/banner/', canStore, validate(form, {}, { abortEarly: false }), file, store);
router.put('/banner/:id', canUpdate, validate(form, {}, { abortEarly: false }), file, update);
router.delete('/banner/:id', canDeleteById, deleteById);

module.exports = router;
