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


router.post('/create', async (req, res) => {
  	const {userid, title, body, date} = req.body
  	const userIsAdmin = await api.checkUserRules(userid)
  	if(userIsAdmin){
  		// lodash vulnerable here!
  		const info = {userid, title, body}
  		_.merge(info, JSON.parse(date))
  		if(info.flag){
  			res.json({'flag':'flag_PROTO_changed'})
  		} else {
  			const result = api.addArticle(info)
  			res.json({status:true, 'info': 'article created'})
  		}
  	} else {
  		res.json({status: false, 'info': 'Access denied'})
  	}
})

module.exports = router;