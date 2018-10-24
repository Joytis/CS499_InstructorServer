const express = require('express');
const { Op } = require('sequelize');
const createError = require('http-errors');
const { logger, errorConversion } = require('../config');
const db = require('../models');
const query = require('./query');

function logAndConvert(error) {
  logger.warn(error.name);
  logger.warn(error);
  return errorConversion(error);
}

const router = express.Router();
const badRequest = createError.BadRequest('Request could not be completed as given');

router.post('/', async (req, res, next) => {
  try {
    if (req.body.data === undefined) return next(badRequest);
    const { sectionId, studentId } = req.body.data;

    if (studentId === undefined) return next(badRequest);
    if (sectionId === undefined) return next(badRequest);
    const entry = await db.studentSection.findOne({
      where: { [Op.And]: [{ studentId }, { sectionId }] },
    });

    // Student already enrolled
    if (entry !== null) return next(createError.Conflict('Student already enrolled in section'));
    return query.createOneEntry(res, next, {
      model: db.studentSection,
      values: req.body,
    });
  } catch (error) {
    return next(logAndConvert(error));
  }
});

router.delete('/', async (req, res, next) => {
  try {
    if (req.body.data === undefined) return next(badRequest);
    const { sectionId, studentId } = req.body.data;

    if (studentId === undefined) return next(badRequest);
    if (sectionId === undefined) return next(badRequest);
    const entry = await db.studentSection.findOne({
      where: { [Op.And]: [{ studentId }, { sectionId }] },
    });

    // Student already enrolled
    if (entry === null) return next(createError.NotFound('Could not find the student enrollment info'));
    await entry.destroy();
    return res.status(200).json({ message: 'Value deleted' });
  } catch (error) {
    return next(logAndConvert(error));
  }
});

module.exports = router;
