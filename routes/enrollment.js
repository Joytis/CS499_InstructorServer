const express = require('express');
const createError = require('http-errors');
const { logger, errorConversion } = require('../config');
const db = require('../models');
// const query = require('./query');

function logAndConvert(error) {
  logger.warn(error.name);
  logger.warn(error);
  return errorConversion(error);
}

const router = express.Router();
const badRequest = createError.BadRequest('Request could not be completed as given');

router.post('/', async (req, res, next) => {
  try {
    if (req.body === undefined) return next(badRequest);
    const { sectionId, studentId } = req.body;

    if (studentId === undefined) return next(badRequest);
    if (sectionId === undefined) return next(badRequest);
    const student = await db.student.findOne({ where: { id: studentId } });
    const sections = await student.getSections();
    const section = sections.find(element => element.id === studentId);
    if (section !== undefined) return next(createError.Conflict('Student already enrolled in section'));

    // Get associated student
    await student.addSection(sectionId);
    // new value created successfully
    return res.status(201).json({ message: 'New value created' });
  } catch (error) {
    return next(logAndConvert(error));
  }
});

router.delete('/', async (req, res, next) => {
  try {
    if (req.body === undefined) return next(badRequest);
    const { sectionId, studentId } = req.body;

    if (studentId === undefined) return next(badRequest);
    if (sectionId === undefined) return next(badRequest);
    const student = await db.student.findOne({ where: { id: studentId } });
    logger.error(JSON.stringify(student, null, 2));
    const sections = await student.getSections();
    logger.error(JSON.stringify(sections, null, 2));
    const section = sections.find(element => element.id === studentId);
    logger.error(JSON.stringify(section, null, 2));
    if (section === undefined) return next(createError.NotFound('Could not find the student enrollment info'));

    student.removeSection(section);
    // Student already enrolled
    return res.status(200).json({ message: 'Value deleted' });
  } catch (error) {
    return next(logAndConvert(error));
  }
});

module.exports = router;
