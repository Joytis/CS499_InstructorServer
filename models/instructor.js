const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const instructor = sequelize.define('instructor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.INTEGER, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    // Validate email with email regex
    email: { type: DataTypes.STRING, validate: { isEmail: true }, allowNull: false },
    birthdate: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: (instr) => {
        const salt = bcrypt.genSaltSync();
        instr.password = bcrypt.hashSync(instr.password, salt);
      },
    },
    instanceMethods: {
      validPassword: password => bcrypt.compareSync(password, this.password),
    },
  });

  instructor.associate = (db) => {
    instructor.hasMany(db.section);
  };

  // Force a sync
  return instructor;
};
