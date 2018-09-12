module.exports = (sequelize, DataTypes) => {
  const grade = sequelize.define('grade', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    grade: { type: DataTypes.INTEGER, allowNull: false },
    isSubmitted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    submissionDate: { type: DataTypes.DATE, allowNull: true },

    // Reference values
    assignmentRef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assignments',
        key: 'id',
      },
    },
    studentRef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'id',
      },
    },
  });

  return grade;
};
