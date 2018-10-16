module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    // Should be the campus-like course identifier. Might be broken down.
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    courseNo: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  });

  course.associate = (db) => {
    course.hasMany(db.section);
  };

  return course;
};
