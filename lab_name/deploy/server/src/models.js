const sequelize = require('./db')
const { Model, DataTypes } = require('sequelize')

const { STRING, INTEGER, TEXT, DATE, BOOLEAN } = DataTypes

class Articles extends Model {}
class Users extends Model {}
class Comments extends Model {}

Articles.init({
    articleid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: TEXT,
    body: TEXT,
    date_of_creation: DATE,
    creatorid: INTEGER,
    comments: TEXT
}, {
    sequelize,
    tableName: 'articles',
    modelName: 'article',
    timestamps: false
})

Users.init({
    userid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    login: STRING(30),
    userpassword: STRING(100),
    isadmin: BOOLEAN
}, {
    sequelize,
    tableName: 'users',
    modelName: 'user',
    timestamps: false
})

Comments.init({
    commentid: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: INTEGER,
    body: TEXT,
    articleid: INTEGER
}, {
    sequelize,
    tableName: 'comments',
    modelName: 'comment',
    timestamps: false 
})

sequelize.sync()

module.exports.Articles = Articles
module.exports.Comments = Comments
module.exports.Users = Users