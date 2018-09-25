const express = require('express');
const { logger } = require('../config');
const db = require('../models');
const sessionChecker = require('./sessionChecker');

const router = express.Router();

/* GET if session is active. */
router.get('/', sessionChecker, (req, res) => res.status(200).json({ }));

/* POST create a new user session. */
router.post('/', async (req, res) => {
  // extract useful info.
  const { username, password } = req.body;
  // Try to authenticate information.
  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.error);
  logger.info(JSON.stringify(instructor));
  if (instructor === null) {
    return res.status(404).json({
      error: true,
      message: 'Instructor does not exist.',
    });
  }
  if (!await db.instructor.validPassword(password, instructor.password)) {
    return res.status(409).json({
      error: true,
      message: 'Password incorrect',
    });
  }
  req.session.instructor = instructor.dataValues;
  return res.status(200).json({
    error: false,
    message: 'Instructor session created',
  });
});

module.exports = router;
