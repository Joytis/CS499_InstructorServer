const createError = require('http-errors');
const express = require('express');
const db = require('../../models');
const sessionChecker = require('../sessionChecker');
const { logger } = require('../../config');

const router = express.Router();

// Get account information from the currently logged on user.
router.get('/', sessionChecker, async (req, res) => {
  // Try to find user.
  res.status(200).json({
    message: 'Instructor information found',
    instructor: req.session.instructor,
  });
});

// Create a new user account.
router.post('/', async (req, res, next) => {
  const { username } = req.body;
  const info = req.body;

  // Try to find user.

  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.error);

  // Check if instructor already exists.
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
      message: 'New instructor created',
      instructor: newInstructor.dataValues,
    });
  }
});

// Update function for users.
router.put('/', sessionChecker, async (req, res, next) => {
  const { username } = req.session.instructor;
  const info = req.body.newData;

  try {
    const instructor = await db.instructor.findOne({ where: { username } });
    if (instructor === null) throw new Error('Could not find user');
    await instructor.update(info);
    res.status(200).json({
      message: 'Instructor updated',
    });
  } catch (err) {
    logger.error(err);
    next(createError(400, 'Unable to edit database fields.'));
  }
});


// Delete the currently
router.delete('/', sessionChecker, async (req, res, next) => {
  const { username } = req.session.instructor;
  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.error);

  if (instructor === null) {
    next(createError(400));
    return;
  }

  try {
    // DEstroy instructor from database.
    await instructor.destroy({ force: true });
    // Remove cookie. We shouldn't be logged in anymore.
    res.clearCookie('instructor_sid');

    res.status(200).json({
      message: 'Instructor deleted',
    });
  } catch (err) {
    logger.error(err);
    next(createError(500, 'Could not delete user'));
  }
});


module.exports = router;
