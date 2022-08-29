'use strict';
const {
  Model, DataTypes
} = require('sequelize');

const sequelize = require('../db')

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init({
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
});

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
  });
  return User;
};

module.exports.model = User