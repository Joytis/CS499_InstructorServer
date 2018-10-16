const createError = require('http-errors');
const { logger, errorConversion } = require('../../config');

const notFoundError = new createError.NotFound('Could not find entry');

function logAndConvert(error) {
  logger.warn(error.name);
  logger.warn(error);
  return errorConversion(error);
}

module.exports.createOneEntry = async (res, next, args) => {
  const { model, values } = args;

  try {
    const newEntry = await model.create(values);
    await newEntry.validate();

    // new value created successfully
    return res.status(201).json({
      message: 'New value created',
      data: newEntry.dataValues,
    });
  } catch (err) {
    return next(logAndConvert(err));
  }
};

module.exports.updateOneEntry = async (res, next, args) => {
  const { model, where, values } = args;

  try {
    const value = await model.findOne({ where });
    if (value === null) return next(notFoundError);

    await value.validate(values);
    await value.update(values);

    // If a callback exists, and we've finished our update, do it.
    if (args.then !== undefined) await args.then(value);

    return res.status(200).json({
      message: 'Value updated',
    });
  } catch (err) {
    return next(logAndConvert(err));
  }
};


module.exports.deleteOneEntry = async (res, next, args) => {
  const { model, where } = args;

  try {
    const value = await model.findOne({ where });
    if (value === null) return next(notFoundError);

    // Destroy value from database.
    await value.destroy({ force: true });
    if (args.then !== undefined) await args.then(value);

    return res.status(200).json({
      message: 'Value deleted',
    });
  } catch (err) {
    return next(logAndConvert(err));
  }
};

module.exports.findOneEntry = async (res, next, args) => {
  const { model, identifier } = args;

  // Try to find user.
  const data = await model.findOne({ where: identifier });
  if (data === null) return next(notFoundError);

  return res.status(200).json({
    message: 'Found requested data',
    data: data.dataValues,
  });
};

module.exports.findAllEntries = async (res, next, args) => {
  const { model } = args;

  // Try to find user.
  try {
    const data = await model.findAll();
    if (data === null) return next(notFoundError);

    // If a callback exists, and we've finished our update, do it.
    if (args.then !== undefined) await args.then(data);

    // Check if value already exists.
    return res.status(200).json({
      message: 'Found requested value',
      data,
    });
  } catch (err) {
    return next(logAndConvert(err));
  }
};
