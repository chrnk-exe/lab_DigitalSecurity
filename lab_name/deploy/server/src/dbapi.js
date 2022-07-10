const pool = require('./db')

async function checkUser(login, password){
	const user = await pool.query(`SELECT * FROM users WHERE login = '${login}'`)
	let result
	if(user.rows.length === 0){
		if(registerNewUser(login, password)){
			let userid = await pool.query(`SELECT userid FROM users WHERE login = '${login}'`)
			userid = userid.rows[0].userid
			result = {
				'status': true,
				'auth': true,
				'info': 'new user',
				'name': login,
				'password': password,
				'isadmin': false,
				'userid':userid
			}
			// console.log(result)
			return result
		} else {
			result = {
				'status': false,
				'info': 'registration failed'
			}
			// console.log(result)
			return result
		}
	} else {
		let userInfo = user.rows[0]
		let userLogin = userInfo.login
		let { userid, userpassword, isadmin } = userInfo
		if(password === userpassword){
			result = {
				'name': login,
				'status': true,
				'auth': true,
				'isadmin' : isadmin,
				'userid': userid
			}
			// console.log(result)
			return result
		} else {
			result = {
				'status': true,
				'auth': false,
				'info': 'incorrect password',
				'userid': userid

			}
			// console.log(result)
			return result
		}
	}

}

async function registerNewUser(login, password){
	try {
		const newUser = await pool.query(`INSERT INTO users (login, userpassword, isadmin) VALUES ('${login}', '${password}', false)`)
		return true
	} catch {
		return false
	}
}

async function getAllArticles(){
	const articles = await pool.query("SELECT * FROM articles")
	const _articles = articles.rows.sort(byField('articleid'))
	function byField(field) {
	  return (a, b) => a[field] < b[field] ? 1 : -1;
	}
	return await _articles
}

async function getComments(id){
	const article = await pool.query(`SELECT comments FROM articles WHERE articleid = ${id}`)
	let commentsList = JSON.parse(article.rows[0].comments)
	if(commentsList.length > 0) {
		const commentsPool = await pool.query(`SELECT * FROM comments WHERE commentid in (${commentsList.join(',')})`)
		const comments = commentsPool.rows
		let _comments = comments.map(comment => comment.userid)
		let names = await pool.query(`SELECT userid, login FROM users WHERE userid in (${_comments.join(',')})`)
		names = names.rows
		_comments = comments.map(comment => ({...comment, name: names.find(name => name.userid == comment.userid).login}))
		return _comments
	} else {
		return []
	}
}

getComments(1)

async function addComment(userID, body, articleID) {
	let newComment = {
		userid: userID,
		body,
		articleid: articleID
	} 
	let result = await pool.query(`INSERT INTO comments	(userid, body, articleid) VALUES (${userID}, '${body}', ${articleID})`)
	if(!result.rowCount){
		return {
			'status': false,
			'info': 'something went wrong'
		}
	}
	let commentPK = await pool.query(`SELECT commentid FROM comments WHERE userid = ${userID} ORDER by commentid DESC LIMIT 1`)
	let commentID 
	try {
		commentID = commentPK.rows[0].commentid
	} catch {
		return {
			'status': false,
			'info': 'something went wrong'
		}
	}
	result = await pool.query(`SELECT comments FROM articles WHERE articleid = ${articleID}`)
	let comments
	try {
		comments = JSON.parse(result.rows[0].comments)
	} catch {
		return {
			'status': false,
			'info': 'incorrect articleID'
		}
	}
	comments.push(commentID)
	comments = JSON.stringify(comments)
	result = await pool.query(`UPDATE articles SET comments	= '${comments}' WHERE articleid	= ${articleID}`)
	if(!result.rowCount){
		return {
			'status': false,
			'info': 'incorrect articleID'
		}
	} else {
		return {
			'status': true
		}
	}
}

async function addArticle(info){
	const {userid, title, body, year, month, day} = info 
	const result = await pool.query(
		`INSERT	INTO articles (title, body, date_of_creation, creatorid, comments) 
		VALUES ('${title}', '${body}', '${year}-${month}-${day}', ${userid}, '[]')`)
	// console.log(result)
}

async function getArticle(ID){
	let article = await pool.query(`SELECT * FROM articles WHERE articleid = ${ID}`)
	if(article.rows[0]){
		return {
			'status': true,
			'data': article.rows[0]
		}
	} else {
		return {
			'status': false,
			'info': 'article doesnt exist'
		}
	}
}

const checkUserRules = async (id) => {
	const result = await pool.query(`SELECT isadmin FROM users WHERE userid = ${id}`)
	const user = result.rows[0]
	return user.isadmin
}

module.exports.addArticle = addArticle
module.exports.addComment = addComment	
module.exports.checkUser = checkUser		
module.exports.getAllArticles = getAllArticles	
module.exports.getComments = getComments
module.exports.getArticle = getArticle
module.exports.checkUserRules = checkUserRules