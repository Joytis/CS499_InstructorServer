const instructorRouter = require('express').Router();

instructorRouter.use('/login', require('./login'));
instructorRouter.use('/logout', require('./logout'));
instructorRouter.use('/account', require('./account'));

// instructorRouter.get()

module.exports = instructorRouter;
