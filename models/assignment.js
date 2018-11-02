module.exports = (sequelize, DataTypes) => {
  const assignment = sequelize.define('assignment', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, notNull: true },
    totalPoints: { type: DataTypes.INTEGER, defaultValue: 100 },
    dateCreated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    dueDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  assignment.associate = (db) => {
    assignment.belongsTo(db.assignmentCategory, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    assignment.hasMany(db.grade, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return assignment;
};
