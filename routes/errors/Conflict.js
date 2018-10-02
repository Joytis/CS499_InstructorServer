module.exports = function Conflict(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The current request could not be completed due a resource conflict';
  this.statusCode = 409;
  this.errorCode = errorCode || 409;
};
