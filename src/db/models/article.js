'use strict';

module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    description: DataTypes.TEXT,
    date_of_creation: DataTypes.DATE,
    creatorid: DataTypes.INTEGER,
    comments: DataTypes.TEXT
  }, {
    // sequelize,
    modelName: 'Article',
    tableName: 'Articles',
    timestamps: true
  })
  return Articles;
};
