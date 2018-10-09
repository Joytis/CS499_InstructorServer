const createError = require('http-errors');
const { logger } = require('../../config');

module.exports = async (res, next, args) => {
  const { model, identifier, values } = args;

  // Try to find user.
  const value = await model.findOne({ where: identifier }).catch(logger.warn);

  // Check if value already exists.
  if (value !== null) return next(new createError.Conflict());

  // Since they do not, create once.
  const newInstructor = await model.create(values).catch(logger.warn);

  // new value created successfully
  if (newInstructor === undefined || newInstructor === null) {
    return next(new createError.InternalServerError());
  }

  return res.status(201).json({
    message: 'New value created',
    value: newInstructor.dataValues,
  });
};
