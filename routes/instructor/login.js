const express = require('express');
const createError = require('http-errors');
const logger = require('../../config');
const db = require('../../models');
const { authentication } = require('../decorators');

const router = express.Router();

/* GET if session is active. */
router.get('/', authentication.sessionChecker, (req, res) => res.status(200).json({}));

/* POST create a new user session. */
router.post('/', async (req, res, next) => {
  // NOTE: give correct error on incorrect login
  // extract useful info.
  const { username, password } = req.body;
  // Try to authenticate information.
  const instructor = await db.instructor.findOne({ where: { username } }).catch(logger.warn);

  if (instructor === null) return next(new createError.NotFound());

  if (!await db.instructor.validPassword(password, instructor.password)) {
    return next(new createError.Conflict());
  }

  req.session.instructor = instructor.dataValues;
  return res.status(200).json({
    message: 'Instructor session created',
  });
});

module.exports = router;
