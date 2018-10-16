module.exports = (sequelize, DataTypes) => {
  const term = sequelize.define('term', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    startDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    endDate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  });

  term.associate = (db) => {
    term.hasMany(db.section);
  };

  return term;
};
