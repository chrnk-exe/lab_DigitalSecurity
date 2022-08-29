const express = require('express');
const cors = require('cors');
const apiroutes = require('./api')
const api = require('./dbapi')
const path = require('path')

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const app = express()
const port = 5000

const corsOptions = {
	credentials: true,
    	origin: "*"
}

//app.use(corsMiddleware())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({origin: "http://84.252.128.241", credentials: true}))
app.use(express.json())

app.use(express.static(path.resolve(__dirname, '../build')))

app.use('/api', apiroutes);
app.get('/articles', async (req, res) => {
	let articles = await api.getAllArticles()
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
