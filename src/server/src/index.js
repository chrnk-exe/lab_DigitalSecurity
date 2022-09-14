const express = require('express');
const cors = require('cors');
const apiroutes = require('./api')
const api = require('./db')
const cookieSession = require('cookie-session')
const path = require('path');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: path.resolve('../', '.env')});
const {HOST} = process.env

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const app = express()
const port = 5000

app.set('trust proxy', 1)
app.use(cors({credentials: true, origin: true}))
app.use(express.json())
app.use(cookieSession({
	name: 'session',
	keys: ['session_token'],
  
	// Cookie Options
	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	httpOnly: false,
	signed: false,
	sameSite: 'none'
}))

app.use((req, res, next) => {
	// res.header("Access-Control-Allow-Credentials", true)
	// res.header("Access-Control-Allow-Origin", `*`)
	next()
})

app.use(express.static(path.resolve(__dirname, '../build')))
app.use('/api', apiroutes);

app.get('/articles', async (req, res) => {
	let { page } = req.query
	let articles = await api.getAllArticles(page)
	let response = articles
	res.set("Content-Type", "application/json")
  	res.json(response)
})

app.get('/authorize', async (req, res) => {
	let uid = req.session.session_token
	let result = {'info': false, 'auth': false}
	if(uid){
		const user = await api.getUser(uid)
		result = {
			'info': true,
			'auth': true,
			...user
		}
	}
	// console.log(uid, result)
	res.json(result)
})	

app.post('/login', async (req, res) => {
	let {login, password, rememberMe} = req.body
	let result = await api.checkUser(login, password)
	if(rememberMe){
		req.session.session_token = result.userid
	}
	// let sessionToken = randomUUID()
	// res.cookie("session_tokenn", sessionToken, {sameSite: 'none', secure: true, httpOnly:false})
	res.json(result)
})

app.get('/logout', async (req, res) => {
	req.session = null
	res.status(200).end()
})

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})
 
app.listen(port, () => {
  	console.log(`App listening on port ${port}`)
})
