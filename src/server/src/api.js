const express = require('express');
const router = express.Router();
const api = require('./db')
const _ = require('lodash')

router.get('/posts', async function(req, res) {
	let id = req.query['id']
	let article = await api.getArticle(id)
	let comments = await api.getComments(id)
	let response
	if(article.status){
		response = {
			'data': article.data,
			'comments': comments
		}
	} else {
		response = {
			'data': article.info
		}
	}
	res.json(response)
	 
	
});

router.get('/userisadmin', async (req, res) => {
	let id = req.query['id']
	let answer = await api.checkUserRules(id)
	res.json(answer)
})

router.post('/comment', async function(req, res) {
	let {id, body, postId} = req.body
	let result = await api.addComment(id, body, postId)
	res.json(result)
});

router.post('/check_user', async function(req, res) {
	let { name } = req.body
	let resp = await api.checkUserName(name)
	let user = resp[0]
	if(user)res.json({name: user.login, info: "Name is correct"})
	else res.json({info: "User doesn't exist", name: null})
})

router.post('/recovery', async function(req, res){
	let { name, password } = req.body
	if(name === 'IvanKit'){
		res.json({password_changed: false})
	} else {
		let resp = await api.recoveryPassword(name, password)
		res.json({password_changed: resp})
	}
})

router.post('/change_name', async function(req, res){
	let {id, name} = req.body
	if(id === 1){
		res.json({name_changed: false})
	} else {
		let resp = await api.renameUser(id, name)
		res.json({name_changed: resp})
	}
})


router.post('/create', async (req, res, next) => {
  	const {userid, title, body, date, description} = req.body
  	const userIsAdmin = await api.checkUserRules(userid)
  	if(userIsAdmin){
		  const info = {userid, title, body, description}
		  let validDate = true
  		try {
			  // lodash vulnerable here!	
			_.merge(info, JSON.parse(date))
		} catch (err){
			res.json({'info': 'date error'})
			validDate = false
		}
  		if(info.flag){
			info.flag = undefined
  			res.json({'info':'fl@g_Pro0toTyp3_1s_p0llu1ed!'})
  		} else if(validDate) {
  			const result = api.addArticle(info)
  			res.json({status:true, 'info': 'article created'})
  		}
  	} else {
  		res.json({status: false, 'info': 'Access denied'})
  	}
})

module.exports = router;