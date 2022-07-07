const express = require('express');
const birds = require('./routes');
const mockPosts = require('./mockup').mockPosts;
const mockComments = require('./mockup').mockComments;
const cors = require('cors');
const mergeFn = require('lodash').defaultsDeep;
const updateComments = require('./mockup').updateComments

const payload = '{"constructor": {"prototype": {"flag": true}}}'

function check() {
    mergeFn({}, JSON.parse(payload));
    if (({})[`flag`] === true) {
        console.log(`Vulnerable to Prototype Pollution via ${payload}`);
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


check();

const app = express()
const port = 5000



app.use(cors())
app.use('/birds', birds);

app.use(express.json())

app.get('/', (req, res) => {
	let response = {articles: mockPosts()}
	res.set("Content-Type", "application/json")
  	res.json(response)
})

app.post('/login', (req, res) => {
	let body = req.body
	console.log(body)
	//checking in DB and response with rules
	if(body['login'] == 'admin' && body['password'] == '1234567qwe') res.json({'auth': 'admin', name: 'Ivan Kotov', id: 0})
	else res.json({'auth': 'user', name: body['login'], id: randomInteger(0, 20)})
	// res.json({'auth': 'user'})
})

app.get('/api/posts', (req, res) => {
	let id = req.query['id']
	let data = mockPosts()
	let post = data.find(item => item['id'] == id)
	data = mockComments()
	let comments = data.filter(item => item['postId'] == id)
	let response = {
		'data': post,
		'comments': comments
	}
	res.json(response)
})

app.post('/api/comment', (req, res) => {
	let body = req.body
	console.log(body)
	updateComments(body)
	console.log(mockComments())
	res.set('Content-Security-Policy', '')
	res.send('200')
})
 
app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})
