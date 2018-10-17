const express = require('express');
const db = require('../models');
const decorators = require('./decorators');

const router = express.Router();
decorators.authentication.decorate(router);
decorators.simpleCrud.decorate(router, db.course);

module.exports = router;
