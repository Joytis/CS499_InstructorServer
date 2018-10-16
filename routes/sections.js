const express = require('express');
const sessionChecker = require('./sessionChecker');
const db = require('../models');
const query = require('./query');

const router = express.Router();

// The same as term just about! This is fairly deliberate.
router.get('/', sessionChecker, async (req, res, next) => query.findAllEntries(res, next, {
  model: db.section,
}));

router.get('/:id', sessionChecker, async (req, res, next) => query.findOneEntry(res, next, {
  model: db.section,
  where: { id: req.params.id },
}));

router.post('/', sessionChecker, async (req, res, next) => query.createOneEntry(res, next, {
  model: db.section,
  values: req.body,
}));

router.put('/:id', sessionChecker, async (req, res, next) => query.updateOneEntry(res, next, {
  model: db.section,
  where: { id: req.params.id },
  values: req.body.data,
}));

router.delete('/:id', sessionChecker, async (req, res, next) => query.deleteOneEntry(res, next, {
  model: db.section,
  where: { id: req.params.id },
}));

module.exports = router;
