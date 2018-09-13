module.exports = (sequelize, DataTypes) => {
  const grade = sequelize.define('grade', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    score: { type: DataTypes.INTEGER, allowNull: false },
    isSubmitted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    submissionDate: { type: DataTypes.DATE, allowNull: true },
  });

  grade.associate = (db) => {
    grade.belongsTo(db.student, { foreignKey: { allowNull: false } });
    grade.belongsTo(db.assignment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return grade;
};
