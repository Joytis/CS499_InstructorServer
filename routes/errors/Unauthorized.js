module.exports = function Conflict(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'User is unable to access requested content';
  this.statusCode = 401;
  this.errorCode = errorCode || 401;
};
