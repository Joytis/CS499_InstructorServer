const express = require('express');
const createError = require('http-errors');
const sessionChecker = require('../sessionChecker');

const router = express.Router();

// Log the user out
router.post('/', sessionChecker, (req, res, next) => {
  if (req.session.instructor && req.cookies.instructor_sid) {
    res.clearCookie('instructor_sid');
    return res.status(200).json({
      message: 'User signed out',
    });
  }

  return next(new createError.InternalServerError());
});

module.exports = router;
