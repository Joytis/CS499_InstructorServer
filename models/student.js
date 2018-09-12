module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  });

  // Force a sync
  return student;
};
