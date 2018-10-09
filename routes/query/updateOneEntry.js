const createError = require('http-errors');
const { logger } = require('../../config');

module.exports = async (res, next, args) => {
  const { model, where, values } = args;

  try {
    const value = await model.findOne({ where }).catch(logger.warn);
    if (value === null) return next(new createError.NotFound());

    await value.update(values);

    // If a callback exists, and we've finished our update, do it.
    try {
      if (args.then !== undefined) await args.then(value);
    } catch (err) {
      return next(new createError.InternalServerError('UpdateOne then callback rejected'));
    }

    return res.status(200).json({
      message: 'Value updated',
    });
  } catch (err) {
    return next(new createError.BadRequest('Unable to update with given values.'));
  }
};
