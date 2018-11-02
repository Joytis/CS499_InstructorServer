module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    // Should be the campus-like course identifier. Might be broken down.
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    courseLabel: { type: DataTypes.STRING, unique: true, allowNull: false },
  });

  course.associate = (db) => {
    course.hasMany(db.section, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return course;
};
