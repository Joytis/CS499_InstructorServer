const { Unauthorized, ErrUnknown } = require('./errors');

module.exports = (req, res, next) => {
  // Check for no session information.
  if (req.session === undefined) return next(new Unauthorized());

  // user is logged on. Let them pass.
  if (req.session.instructor && req.cookies.instructor_sid) return next();

  // Don't know what happened, but it's definitely not authorized.
  return next(new ErrUnknown());
};
