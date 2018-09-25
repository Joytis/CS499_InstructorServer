const createError = require('http-errors');
const express = require('express');
const db = require('../../models');
const sessionChecker = require('../sessionChecker');
const { logger } = require('../../config');

const router = express.Router();

/* GET current user listing. */
router.get('/', sessionChecker, async (req, res) => {
  // Try to find user.
  res.status(200).json({
    error: false,
    message: 'Instructor information found',
    instructor: req.session.instructor,
  });
});

router.post('/', async (req, res, next) => {
  const { username } = req.body;
  const info = req.body;

  // Try to find user.

  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.error);

  // Check if instructor already exists.
  logger.info(instructor);
  if (instructor !== null) {
    next(createError(409));
    return;
  }

  // Since they do not, create once.
  const newInstructor = await db.instructor.create(info).catch((error) => {
    logger.error(error);
    next(createError(400));
  });

  // new instructor created successfully
  if (newInstructor !== undefined && newInstructor !== null) {
    res.status(200).json({
      error: false,
      message: 'New instructor created',
      instructor: newInstructor.dataValues,
    });
  }
});


module.exports = router;
