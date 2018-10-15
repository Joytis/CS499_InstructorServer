const express = require('express');
const db = require('../../models');
const sessionChecker = require('../sessionChecker');
const query = require('../query');

const router = express.Router();

// Get account information from the currently logged on user.
router.get('/', sessionChecker, async (req, res, next) => query.findOneEntry(res, next, {
  model: db.instructor,
  where: { id: req.session.instructor.id },
}));

// Create a new user account.
router.post('/', async (req, res, next) => query.createOneEntry(res, next, {
  model: db.instructor,
  where: { username: req.body.username },
  values: req.body,
}));

// Update function for users.
router.put('/', sessionChecker, async (req, res, next) => query.updateOneEntry(res, next, {
  model: db.instructor,
  where: { id: req.session.instructor.id },
  values: req.body.data,
  then: (value) => { req.session.instructor = value.dataValues; }, // update session info.
}));


// Delete the currently
router.delete('/', sessionChecker, async (req, res, next) => query.deleteOneEntry(res, next, {
  model: db.instructor,
  where: { id: req.session.instructor.id },
  then: () => { res.clearCookie('instructor_sid'); },
}));

module.exports = router;
