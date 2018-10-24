const express = require('express');

const router = express.Router();

router.use('/instructor', require('./instructor'));
router.use('/terms', require('./terms'));
router.use('/courses', require('./courses'));
router.use('/students', require('./students'));
router.use('/sections', require('./sections'));
router.use('/grades', require('./grades'));
router.use('/assignments', require('./assignments'));
router.use('/assignmentCategories', require('./assignmentCategories'));
router.use('/enrollment', require('./enrollment'));

module.exports = router;
