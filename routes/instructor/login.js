const express = require('express');
const logger = require('../../config');
const db = require('../../models');
const sessionChecker = require('../sessionChecker');
const { NotFound, Conflict } = require('../errors');

const router = express.Router();

/* GET if session is active. */
router.get('/', sessionChecker, (req, res) => res.status(200).json({}));

/* POST create a new user session. */
router.post('/', async (req, res, next) => {
  // extract useful info.
  const { username, password } = req.body;
  // Try to authenticate information.
  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.warn);

  if (instructor === null) next(new NotFound());

  if (!await db.instructor.validPassword(password, instructor.password)) {
    next(new Conflict());
  }

  req.session.instructor = instructor.dataValues;
  res.status(200).json({
    message: 'Instructor session created',
  });
});

module.exports = router;
