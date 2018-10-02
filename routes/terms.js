const express = require('express');
// const { logger } = require('../config');
const errors = require('./errors');
const sessionChecker = require('./sessionChecker');
const db = require('../models');
const { createOneEntry, updateOneEntry, deleteOneEntry } = require('./util');

const router = express.Router();

router.get('/', sessionChecker, (req, res, next) => {
  db.term.findAll()
    .then(terms => res.status(200).json({
      data: terms,
    }))
    .catch(error => next(errors.lazyError(error)));
});

router.post('/', sessionChecker, async (req, res, next) => createOneEntry(res, next, {
  model: db.term,
  where: { title: req.body.title },
  values: req.body,
}));

router.put('/:id', sessionChecker, async (req, res, next) => updateOneEntry(res, next, {
  model: db.term,
  where: { id: req.params.id },
  values: req.body.data,
}));

router.delete('/:id', sessionChecker, async (req, res, next) => deleteOneEntry(res, next, {
  model: db.term,
  where: { id: req.params.id },
}));

module.exports = router;
