const createError = require('http-errors');
const { logger } = require('../../config');

module.exports = async (res, next, args) => {
  const { model, where } = args;
  const value = await model.findOne({ where }).catch(logger.warn);

  if (value === null) return next(new createError.NotFound());

  try {
    // Destroy value from database.
    await value.destroy({ force: true });

    // Remove cookie. We shouldn't be logged in anymore.
    res.clearCookie('instructor_sid');

    return res.status(200).json({
      message: 'Value deleted',
    });
  } catch (err) {
    return next(new createError.InternalServerError());
  }
};
