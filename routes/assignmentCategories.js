const express = require('express');
const db = require('../models');
const decorators = require('./decorators');
const query = require('./query');

const router = express.Router();
decorators.authentication.decorate(router);
decorators.simpleCrud.decorate(router, db.assignmentCategory);

// Gets all the sectinos from the database with the given Id
router.get('/:id/assignments', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.assignmentCategory,
  where: { id: req.params.id },
  expectedMethod: 'getAssignments',
}));

module.exports = router;
