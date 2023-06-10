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

router.get('/general/', index);
router.get('/general/:id', show);
router.post('/general/', canStore, validate(form, {}, { abortEarly: false }), file, store);
router.put('/general/:id', canUpdate, validate(form, {}, { abortEarly: false }), file, update);
router.delete('/general/:id', canDeleteById, deleteById);

module.exports = router;
