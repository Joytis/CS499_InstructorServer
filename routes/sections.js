const express = require('express');
const db = require('../models');
const decorators = require('./decorators');
const query = require('./query');

const router = express.Router();
decorators.authentication.decorate(router);
decorators.simpleCrud.decorate(router, db.section);

// Gets all the sectinos from the database with the given Id
router.get('/:id/students', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.section,
  where: { id: req.params.id },
  expectedMethod: 'getStudents',
}));

// Gets all the sectinos from the database with the given Id
router.get('/:id/assignmentCategories', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.section,
  where: { id: req.params.id },
  expectedMethod: 'getAssignmentCategories',
}));

module.exports = router;
