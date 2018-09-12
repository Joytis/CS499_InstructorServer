module.exports = (sequelize, DataTypes) => {
  const term = sequelize.define('term', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    startDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    endDate: { type: DataTypes.DATE, allowNull: false },
    title: { type: DataTypes.STRING, defaultValue: 'Term: ' },
  });

  return term;
};
