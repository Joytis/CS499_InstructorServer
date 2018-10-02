module.exports = function BadRequest(message, errorCode) {
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The given request is ill-formed.';
  this.statusCode = 400;
  this.errorCode = errorCode || 400;
};
