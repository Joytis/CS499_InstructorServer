module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aNumber: { type: DataTypes.INTEGER, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
  });

  student.associate = (db) => {
    student.hasMany(db.grade);
    student.belongsToMany(db.section, { through: 'StudentSection' });
  };

  // Force a sync
  return student;
};
