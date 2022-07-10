const { Pool } = require('pg')

const pool = new Pool({
	user: 'postgres',
	password: 'qwerty',
	database: 'Awesome Blog',
	host: 'localhost',
	port: '5432',
})

module.exports = pool