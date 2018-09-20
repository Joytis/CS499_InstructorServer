const express = require('express');
const db = require('../models');
const sessionChecker = require('./sessionChecker');
const { logger } = require('../config');

const router = express.Router();

/* GET current user listing. */
router.get('/', sessionChecker, async (req, res) => {
  // Try to find user.
  res.status(200).json({
    error: false,
    message: 'Instructor information found',
    instructor: req.session.user,
  });
});

router.post('/', async (req, res) => {
  const { username } = req.body;
  const info = req.body;

  // Try to find user.
  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.error);

  // Check if instructor already exists.
  logger.info(instructor);
  if (instructor === null) {
    res.status(409).json({
      error: true,
      message: 'Instructor with given username already exists.',
    });
    return;
  }

  // Since they do not, create once.
  const newInstructor = await db.instructor.create(info).catch((error) => {
    logger.error(error);
    res.status(400).json({
      error: true,
      message: 'Could not create user with given credentials',
    });
  });

  // new instructor created successfully
  res.status(200).json({
    error: false,
    message: 'New instructor created',
    instructor: newInstructor.dataValues,
  });
});


module.exports = router;
