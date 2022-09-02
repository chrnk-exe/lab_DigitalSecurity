'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userid: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    articleid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true
  })
  return Comments;
};
