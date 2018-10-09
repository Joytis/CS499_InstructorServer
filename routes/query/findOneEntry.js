const createError = require('http-errors');
const { logger } = require('../../config');

module.exports = async (res, next, args) => {
  const { model, identifier } = args;

  // Try to find user.
  const value = await model.findOne({ where: identifier }).catch(logger.warn);

  // Check if value already exists.
  if (value === null) return next(new createError.NotFound());

  return res.status(200).json({
    message: 'Found requested value',
    value: value.dataValues,
  });
};
