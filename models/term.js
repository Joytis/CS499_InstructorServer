module.exports = (sequelize, DataTypes) => {
  const term = sequelize.define('term', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: true },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: { isDate: true },
    },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
  });

  term.associate = (db) => {
    term.hasMany(db.section, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return term;
};
