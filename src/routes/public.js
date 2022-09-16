const express = require('express');
const router = express.Router();
const checkUserName = require('../services/checkUserName')
const createNewUser = require('../services/createNewUser')
const checkUserPassword = require('../services/checkUserPassword')
const getAllArticles = require('../services/getAllArticles')
const getComments = require('../services/getComments')
const getArticle = require('../services/getArticle')
const checkUserRules = require('../services/checkUserRules')
const recoveryPassword = require('../services/updatePassword')
const _ = require('lodash')

router.post('/login', async (req, res) => {
    const {login, password} = req.body
    const user = await checkUserPassword(login, password)
    if(user){
        const result = {
            auth: true,
            info: 'Success!',
            id: user.id,
            name: user.login,
            isadmin: user.isadmin
        }

        //lab logic
        if(user.isadmin){
            result.flag = 'flag_@dm1n_account'
        }
        //lab logic

        req.session.session_token = user.id
        res.json(result)
    } else {
        res.json({
            auth: false,
            info: 'Incorrect login or/and password!'
        })
    }
})

router.post('/recovery', async function(req, res){
	const { name, password } = req.body
    const userIsAdmin = await checkUserRules(name)
	if(userIsAdmin){
		res.json({password_changed: false})
	} else {
		const resp = await recoveryPassword(name, password)
		res.json({password_changed: resp})
	}
})

router.post('/registration', async (req, res) => {
    const {login, password} = req.body
    const nameIsTaken = (await checkUserName(login))
    if(nameIsTaken){
        res.json({
            auth: false,
            info: 'This name is taken, please select another one.'
        })
    } else {
        const user = await createNewUser(login, password)
        req.session.session_token = user.id
        res.json({
            auth: true,
            info: 'Success!',
            id: user.id,
            name: user.login,
            isadmin: user.isadmin
        })
    }
})

router.get('/articles', async (req, res) => {
	const { page } = req.query
	const articles = await getAllArticles(page)
  	res.json(articles)
})

router.get('/posts', async function(req, res) {
	const { id } = req.query
	const article = await getArticle(id)
    const comments = await getComments(id)
    if(article){
        res.json({
            data: article,
            comments: comments
        })
    } else {
        res.json({
            info: 'article doesnt exits'
        })
    }
});

module.exports = router