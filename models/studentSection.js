module.exports = (sequelize, DataTypes) => {
  const studentSection = sequelize.define('studentSection', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  });
  return studentSection;
};
