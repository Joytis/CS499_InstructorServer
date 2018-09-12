module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    // Validate email with email regex
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    birthdate: DataTypes.DATE,
  });

  // Force a sync
  return user;
};
