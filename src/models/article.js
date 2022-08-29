'use strict';
const {
  Model, DataTypes
} = require('sequelize');

class Article extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Article.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: DataTypes.TEXT,
  body: DataTypes.TEXT,
  date_of_creation: DataTypes.DATE,
  creatorid: DataTypes.INTEGER,
  comments: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'Articles',
  timestamps: true
});

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    date_of_creation: DataTypes.DATE,
    creatorid: DataTypes.INTEGER,
    comments: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
    tableName: 'Articles',
    timestamps: true
  });
  return Article;
};

module.exports.model = Article