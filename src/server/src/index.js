const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session')

const private = require('./routes/private')
const public = require('./routes/public')
const path = require('path');

require('dotenv').config({ path: path.resolve('../', '.env')});

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
	sameSite: 'none',
	secure: false
}))

app.use(express.static(path.resolve(__dirname, '../build')))

app.use(public)
app.use('/api', private)

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})
 
app.listen(port, () => {
  	console.log(`[server]: App listening on port ${port}`)
})
