const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const instructor = sequelize.define('instructor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    // Validate email with email regex
    email: { type: DataTypes.STRING, validate: { isEmail: true }, allowNull: false, unique: true },
    birthdate: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: async (instr) => {
        instr.password = await bcrypt.hash(instr.password, 6);
      },
    },
  });

  instructor.validPassword = async (password, hash) => bcrypt.compare(password, hash);

  instructor.associate = (db) => {
    instructor.hasMany(db.section);
  };

  // Force a sync
  return instructor;
};
