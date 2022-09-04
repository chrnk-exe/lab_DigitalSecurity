const express = require('express');
const cors = require('cors');
const apiroutes = require('./api')
const api = require('./db')
const path = require('path')

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const app = express()
const port = 5000

app.use(cors({origin: "*", credentials: true}))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../build')))

app.use('/api', apiroutes);
app.get('/articles', async (req, res) => {
	let { page } = req.query
	let articles = await api.getAllArticles(page)
	let response = articles
	res.set("Content-Type", "application/json")
  	res.json(response)
})

app.post('/login', async (req, res) => {
	let {login, password} = req.body
	let result = await api.checkUser(login, password)
	res.json(result)
})

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})
 
app.listen(port, () => {
  	console.log(`App listening on port ${port}`)
})
