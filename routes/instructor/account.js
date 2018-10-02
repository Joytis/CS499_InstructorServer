const express = require('express');
const db = require('../../models');
const sessionChecker = require('../sessionChecker');
const { createOneEntry, updateOneEntry, deleteOneEntry } = require('../util');

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
router.post('/', async (req, res, next) => createOneEntry(res, next, {
  model: db.instructor,
  where: { username: req.body.username },
  values: req.body,
}));

// Update function for users.
router.put('/', sessionChecker, async (req, res, next) => updateOneEntry(res, next, {
  model: db.instructor,
  where: { id: req.session.instructor.id },
  values: req.body.data,
}));


// Delete the currently
router.delete('/', sessionChecker, async (req, res, next) => deleteOneEntry(res, next, {
  model: db.instructor,
  where: { id: req.session.instructor.id },
}));

module.exports = router;
