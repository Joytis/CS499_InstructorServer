/* eslint-disable no-param-reassign */
const createError = require('http-errors');
const express = require('express');
const db = require('../models');
const decorators = require('./decorators');
const query = require('./query');
const { logger, errorConversion } = require('../config');

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

// Gets all the sectinos from the database with the given Id
router.get('/:id/grades', async (req, res, next) => query.findOneThenQuery(res, next, {
  model: db.section,
  where: { id: req.params.id },
  expectedMethod: 'getAssignmentCategories',
}));


const notFoundError = new createError.NotFound('Could not find entry');
// Copies the section from one term to another target term.
router.post('/:sid/copyToTerm/:tid', async (req, res, next) => {
  const badRequest = new createError.BadRequest('Invalid term given');

  try {
    logger.info('Gathering objects...');
    const oldSection = await db.section.findOne({ where: { id: req.params.sid } });
    if (oldSection === null) return next(notFoundError);
    const term = await db.term.findOne({ where: { id: req.params.tid } });
    if (term === null) return next(notFoundError);
    if (term.id === oldSection.termId) return next(badRequest);

    // Build a new instance
    logger.info('Copying section...');
    const sectionValues = Object.assign({}, oldSection.dataValues);
    sectionValues.termId = term.id;
    delete sectionValues.id;
    const newSection = await db.section.create(sectionValues); // Copy section;

    // Get all old assignment categories.
    const oldAssCats = await oldSection.getAssignmentCategories();

    await Promise.all(oldAssCats.map(async (asscat) => {
      // Create a new assignment category for our section.
      logger.info('Copying asscat...');
      const asscatValues = Object.assign({}, asscat.dataValues);
      asscatValues.sectionId = newSection.dataValues.id;
      delete asscatValues.id;
      const newAssCat = await db.assignmentCategory.create(asscatValues);

      // Copy all old assignments.
      const oldAssignments = await asscat.getAssignments();
      await Promise.all(oldAssignments.map(async (assignment) => {
        logger.info('Copying ass...');
        const assignmentValues = Object.assign({}, assignment.dataValues);
        assignmentValues.assignmentCategoryId = newAssCat.dataValues.id;
        delete assignmentValues.id;
        await db.assignment.create(assignmentValues);
      }));
    }));

    return res.status(200).json({
      message: 'Section copied successfully!',
    });
  } catch (err) {
    logger.warn(err.name);
    logger.warn(err);
    return next(errorConversion(err));
  }
});

module.exports = router;
