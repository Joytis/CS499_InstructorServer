module.exports = (sequelize, DataTypes) => {
  const assignmentCategory = sequelize.define('assignmentCategory', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    weight: { type: DataTypes.FLOAT, defaultValue: 0.0, validate: { min: 0.0, max: 1.0 } },
    lowestGradesDropped: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false },
  });

  assignmentCategory.associate = (db) => {
    assignmentCategory.belongsTo(db.course, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    assignmentCategory.hasMany(db.assignment);
  };

  return assignmentCategory;
};
