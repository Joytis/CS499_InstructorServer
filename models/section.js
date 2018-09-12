module.exports = (sequelize, DataTypes) => {
  const section = sequelize.define('section', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    sectionNumber: { type: DataTypes.INTEGER, allowNull: false },

    // Reference values
    courseRef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'courses', key: 'id' },
    },
    termRef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'terms', key: 'id' },
    },
  });

  return section;
};
