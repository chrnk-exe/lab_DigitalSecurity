const express = require('express')
const birds = require('./routes');
const cors = require('cors')
const mergeFn = require('lodash').defaultsDeep

const payload = '{"constructor": {"prototype": {"flag": true}}}'

function check() {
    mergeFn({}, JSON.parse(payload));
    if (({})[`flag`] === true) {
        console.log(`Vulnerable to Prototype Pollution via ${payload}`);
    }
  }

function mockPosts() {
	return [
	{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
  {
    "userId": 1,
    "id": 4,
    "title": "eum et est occaecati",
    "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  },
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  },
  {
    "userId": 1,
    "id": 6,
    "title": "dolorem eum magni eos aperiam quia",
    "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
  },]
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

	res.json({'auth': 'admin', name: 'Ivan Kotov'})
	// res.json({'auth': 'user'})
})

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})

