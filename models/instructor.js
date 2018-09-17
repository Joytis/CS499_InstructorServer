module.exports = (sequelize, DataTypes) => {
  const instructor = sequelize.define('instructor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.INTEGER, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    // Validate email with email regex
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    birthdate: DataTypes.DATE,
  });

  instructor.associate = (db) => {
    instructor.hasMany(db.section);
  };

  // Force a sync
  return instructor;
};
