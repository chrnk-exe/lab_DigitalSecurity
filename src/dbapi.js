const sequelize = require('./db')
const { Users, Articles, Comments } = require('./models')

const toPlain = res => {
    if(Array.isArray(res)) return res.map(el => el.get({plain: true}))
    else return res.get({plain: true})
}

async function checkUser(userLogin, password){
    const users = Users.findAll({
        where: {
            login: userLogin
        }
    }).then(toPlain)
    if((await users).length === 0){
        const newUser = await registerNewUser(userLogin, password).then(toPlain)
        const {login, id, userpassword, isadmin} = await newUser
        return {
            status: true,
            auth: true,
            info: 'New user',
            name: login,
            password: userpassword,
            isadmin,
            userid: id
        }
    } else if( (await users).length > 1) {
        return {
            status: false,
            info: 'Duplicate user'
        }
    } else {
        const user = (await users)[0]
        if(user.userpassword === password) {
            return {
                status: true,
                auth: true,
                name: userLogin,
                password: user.userpassword,
                isadmin: user.isadmin,
                userid: user.id
            }
        } else {
            return {
                status: true,
                auth: false,
                info: 'Incorrect password'
            }
        }
    }
}

async function registerNewUser(login, password){
    const newUser = await Users.create({
        login: login,
        userpassword: password,
        isadmin: false
    })
    return newUser
}

async function getAllArticles(){
    const articles = Articles.findAll({
        order: [
            ['id', 'ASC']
        ]
    }).then(toPlain)
    return articles
}

async function getComments(articleid){
	let article = Articles.findAll({
        where: {
            id: articleid
        },
        attributes: ['comments']
    }).then(toPlain)
    article = await article
	let commentsList = JSON.parse(article[0].comments)
	if(commentsList.length > 0) {
        const commentsPool = Comments.findAll({
            where: {
                id: commentsList
            }
        }).then(toPlain)
        let useridComments = (await commentsPool).map(comment => comment.userid)
        let names = await Users.findAll({
            where: {
                id: useridComments
            }, 
            attributes: ['id', 'login']
        }).then(toPlain)
        const comments = (await commentsPool).map(comment => ({...comment, name: names.find(name => name.id == comment.userid).login}))
        return comments
	} else {
		return []
	}
}

// getComments(1).then(res => console.log(res))

async function addComment(userid, body, articleid){
    const newComment = await Comments.create({
        userid,
        body,
        articleid
    })
    const articel = await Articles.findAll({
        where: {
            id: articleid
        }
    })
    let comments = JSON.parse(articel[0].comments)
    comments.push(newComment.id)
    articel[0].comments = JSON.stringify(comments)
    articel[0].save()
}

// addComment(1, 'VERY COOL ARTICLE BRO!', 1).then(() => console.log('comment send'))

async function addArticle(info) {
    const {userid, title, body, year, month, day} = info 
    const date = new Date(`${year}, ${month}, ${day+1}`)
    Articles.create({
        creatorid: userid,
        title,
        body,
        comments: '[]',
        date_of_creation: date
    })
}

async function getArticle(articleid){
    const article = await Articles.findAll({
        where: {
            id: articleid
        }
    })
    if(article.length){
        return {
            status: true,
            data: article[0].get({plain: true})
        }
    } else {
        return {
            'status': false,
            'info': 'article doesnt exist'
        }
    }
} 


const checkUserRules = async (userid) => {
	const result = await Users.findAll({
        where: {
            id: userid
        }
    })
	return result[0].getDataValue('isadmin')
}

module.exports.addArticle = addArticle
module.exports.addComment = addComment	
module.exports.checkUser = checkUser		
module.exports.getAllArticles = getAllArticles	
module.exports.getComments = getComments
module.exports.getArticle = getArticle
module.exports.checkUserRules = checkUserRules