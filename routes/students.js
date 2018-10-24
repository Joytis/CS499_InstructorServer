const express = require('express');
const db = require('../models');
const decorators = require('./decorators');
const query = require('./query');

const router = express.Router();
decorators.authentication.decorate(router);
decorators.simpleCrud.decorate(router, db.student);

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
