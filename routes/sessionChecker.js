module.exports = (req, res, next) => {
  if (req.session === undefined) {
    res.status(401).json({
      error: true,
      message: 'User not signed in: has no session',
    });
    return;
  }

  // user is logged on. Let them pass.
  if (req.session.instructor && req.cookies.instructor_sid) {
    next();
  } else { // User doesn't have login session. Error out based on status
    res.status(401).json({
      error: true,
      message: 'User not signed in: has no session',
    });
  }
};
