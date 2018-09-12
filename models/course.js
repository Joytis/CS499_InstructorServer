module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    // Should be the campus-like course identifier. Might be broken down.
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  });

  return course;
};
