const { logger } = require('../../config');
const { NotFound, BadRequest } = require('../errors');

module.exports = async (res, next, args) => {
  const { model, where, values } = args;

  try {
    const value = await model.findOne({ where }).catch(logger.warn);
    if (value === null) return next(new NotFound());

    await value.update(values);
    return res.status(200).json({
      message: 'Value updated',
    });
  } catch (err) {
    return next(new BadRequest());
  }
};
