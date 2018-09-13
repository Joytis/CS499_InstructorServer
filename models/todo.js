module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  });
  return todo;
};
