const express = require('express');
const router = express.Router();
const api = require('./dbapi')

router.get('/posts', async function(req, res) {
	let id = req.query['id']
	let article = await api.getArticle(id)
	let comments = await api.getComments(id)
	// console.log(article, comments)
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

router.post('/comment', async function(req, res) {
	let {id, body, postId} = req.body
	let result = await api.addComment(id, body, postId)
	res.json(result)
});


router.post('/create', (req, res) => {
  	console.log('/api/create worked!')
  	// lodash vulnerable here!
	res.json(req.body)
})

module.exports = router;