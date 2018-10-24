const express = require('express');
const db = require('../models');
const query = require('./query');

const router = express.Router();

router.post('/', async (req, res, next) => query.createOneEntry(res, next, {
  model: db.studentSection,
  values: req.body,
}));

router.delete('/', async (req, res, next) => query.deleteOneEntry(res, next, {
  model: db.studentSection,
  where: { id: req.params.id },
}));

module.exports = router;
