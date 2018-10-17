const createError = require('http-errors');
const { logger } = require('../../config');

function sessionChecker(req, res, next) {
  // Check for no login information.
  if (req.session === undefined || req.cookies.instructor_sid === undefined) {
    logger.warn('Could not find session information..');
    return next(new createError.Unauthorized('No session information found. Please log in.'));
  }

  if (req.session.instructor && req.cookies.instructor_sid) {
    return next();
  }

  // Don't know what happened, but it's definitely not authorized.
  logger.error('Should not be accessible code');
  return next(new createError.InternalServerError('Internal error when checking for session'));
}

module.exports.sessionChecker = sessionChecker;
module.exports.decorate = (router) => {
  router.use(sessionChecker);
};
