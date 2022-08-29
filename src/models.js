const sequelize = require('./db')
const { Model, DataTypes } = require('sequelize')
const User = require('./models/user')
const Comment = require('./models/comment')
const Article = require('./models/article')

const { STRING, INTEGER, TEXT, DATE, BOOLEAN } = DataTypes

class Articles extends Article.model {}
class Users extends User.model {}
class Comments extends Comment.model {}

// Articles.init({
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     title: TEXT,
//     body: TEXT,
//     date_of_creation: DATE,
//     creatorid: INTEGER,
//     comments: TEXT
// }, {
//     sequelize,
//     tableName: 'Articles',
//     modelName: 'Article',
//     timestamps: true
// })

// Users.init({
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     login: STRING(30),
//     userpassword: STRING(100),
//     isadmin: BOOLEAN
// }, {
//     sequelize,
//     tableName: 'Users',
//     modelName: 'User',
//     timestamps: true
// })

// Comments.init({
//     id: {
//         type: INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     userid: INTEGER,
//     body: TEXT,
//     articleid: INTEGER
// }, {
//     sequelize,
//     tableName: 'Comments',
//     modelName: 'Comment',
//     timestamps: true
// })

// sequelize.sync()

module.exports.Articles = Articles
module.exports.Comments = Comments
module.exports.Users = Users