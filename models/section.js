module.exports = (sequelize, DataTypes) => {
  const section = sequelize.define('section', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true },
    sectionNumber: { type: DataTypes.INTEGER, allowNull: false },
  });

  section.associate = (db) => {
    section.belongsTo(db.instructor);
    section.belongsTo(db.course, { foreignKey: { allowNull: false } });
    section.belongsTo(db.term, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    section.belongsToMany(db.student, { through: 'StudentSection' });
  };

  return section;
};
