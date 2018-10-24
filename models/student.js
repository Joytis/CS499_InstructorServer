module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    aNumber: { type: DataTypes.INTEGER, unique: true, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, validate: { isEmail: true }, allowNull: false },
  });

  student.associate = (db) => {
    student.hasMany(db.grade);
    student.belongsToMany(db.section, { through: 'studentSection' });
  };

  // Force a sync
  return student;
};
