module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  todo.associate = () => {
    // associations can be defined here
  };
  return todo;
};
