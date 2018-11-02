module.exports = (sequelize, DataTypes) => {
  const assignmentCategory = sequelize.define('assignmentCategory', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
      validate: { min: 0.0, max: 1.0 },
      allowNull: false,
    },
    lowestGradesDropped: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
  });

  assignmentCategory.associate = (db) => {
    assignmentCategory.belongsTo(db.section, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    assignmentCategory.hasMany(db.assignment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return assignmentCategory;
};
