const sequelize = require('./db')
const { Model, DataTypes } = require('sequelize')

const { STRING, INTEGER, TEXT, DATE, BOOLEAN } = DataTypes

class Articles extends Model {}
class Users extends Model {}
class Comments extends Model {}

Articles.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: TEXT,
    body: TEXT,
    date_of_creation: DATE,
    creatorid: INTEGER,
    comments: TEXT
}, {
    sequelize,
    tableName: 'Articles',
    modelName: 'Article',
    timestamps: true
})

Users.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: STRING(30),
    userpassword: STRING(100),
    isadmin: BOOLEAN
}, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
    timestamps: true
})

Comments.init({
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userid: INTEGER,
    body: TEXT,
    articleid: INTEGER
}, {
    sequelize,
    tableName: 'Comments',
    modelName: 'Comment',
    timestamps: true
})

// sequelize.sync()

module.exports.Articles = Articles
module.exports.Comments = Comments
module.exports.Users = Users