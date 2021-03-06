module.exports = (sequelize, DataTypes) => {
  const section = sequelize.define('section', {
    // Data values
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sectionNumber: { type: DataTypes.INTEGER, allowNull: false },
    gradeScaleA: { type: DataTypes.INTEGER, allowNull: false },
    gradeScaleB: { type: DataTypes.INTEGER, allowNull: false },
    gradeScaleC: { type: DataTypes.INTEGER, allowNull: false },
    gradeScaleD: { type: DataTypes.INTEGER, allowNull: false },
  });

  section.associate = (db) => {
    section.belongsTo(db.instructor);
    section.belongsTo(db.course, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    section.belongsTo(db.term, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
    section.belongsToMany(db.student, { through: 'studentSection' });
    section.hasMany(db.assignmentCategory, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
  };

  return section;
};
