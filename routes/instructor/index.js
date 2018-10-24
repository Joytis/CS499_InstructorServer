const instructorRouter = require('express').Router();
const decorators = require('../decorators');
const db = require('../../models');

instructorRouter.use('/login', require('./login'));
instructorRouter.use('/logout', require('./logout'));
instructorRouter.use('/account', require('./account'));

// Allow us to get instructors from here. Duplicate code to the accounts tab, but whatever.;
//  Allot users to create other user accoutnts. I don't think it matters.;
decorators.authentication.decorate(instructorRouter, db.instructor);
decorators.simpleCrud.decorate(instructorRouter, db.instructor);

module.exports = instructorRouter;
