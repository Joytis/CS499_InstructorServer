const express = require('express');
const { logger } = require('../config');
const db = require('../models');
const sessionChecker = require('./sessionChecker');

const router = express.Router();

/* GET if session is active. */
router.get('/', sessionChecker, (req, res) => {
  // If user has passed session information, return OK.
  res.status(200);
});

/* POST create a new user session. */
router.post('/', async (req, res) => {
  // extract useful info.
  const { username, password } = req.body;
  // Try to authenticate information.
  const user = await db.instructor.findOne({ where: { username } }).catch(logger.error);
  if (!user) {
    res.status(404).json({
      error: true,
      message: 'Instructor does not exist.',
    });
  } else if (!user.validatePassword(password)) {
    res.status(409).json({
      error: true,
      message: 'Password incorrect',
    });
  } else {
    req.session.user = user.dataValues;
    res.status(200).json({
      error: false,
      message: 'Instructor session created',
    });
  }
});

module.exports = router;
