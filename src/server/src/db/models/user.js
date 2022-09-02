'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    login: DataTypes.STRING,
    userpassword: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  })
  return Users;
};