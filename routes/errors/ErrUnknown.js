module.exports = function ErrUnknown(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The server has encountered an unknown error.';
  this.statusCode = 500;
  this.errorCode = errorCode || 500;
};
