const express = require('express');
const db = require('../models');
const decorators = require('./decorators');
const query = require('./query');
const { logger, errorConversion } = require('../config');

const router = express.Router();
decorators.authentication.decorate(router);
decorators.simpleCrud.decorate(router, db.student);

// OVERWRITE THE SIMPLECRUD FUNCTIONALITY.
router.delete('/:id', async (req, res, next) => {
  const where = { id: req.params.id };
  try {
    const student = db.student.findOne({ where });
    await student.setSections([]); // remove all sections from student.
  } catch (err) {
    logger.warn(err.name);
    logger.warn(err);
    return errorConversion(err);
  }

  return query.deleteOneEntry(res, next, {
    model: db.student,
    where,
  });
});

// Gets all the sectinos from the database with the given Id
router.get('/:id/grades', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.student,
  where: { id: req.params.id },
  expectedMethod: 'getGrades',
}));

// Gets all the sectinos from the database with the given Id
router.get('/:id/sections', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.student,
  where: { id: req.params.id },
  expectedMethod: 'getSections',
}));

module.exports = router;
