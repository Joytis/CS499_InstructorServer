module.exports = (sequelize, DataTypes) => {
  const instructor = sequelize.define('instructor', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.STRING(50000),
  });

  instructor.associate = (db) => {
    instructor.hasMany(db.section);
  };

  // Force a sync
  return instructor;
};
