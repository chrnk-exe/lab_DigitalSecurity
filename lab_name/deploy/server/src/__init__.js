const pool = require('./db')

const main = () => {
	let result = pool.query(`
		CREATE TABLE IF NOT EXISTS articles(
			articleid SERIAL PRIMARY KEY,
			title text,
			body text, 
			date_of_creation date,
			creatorid INT,
			comments text
		)`)
	//result check
	result = pool.query(`
		CREATE TABLE IF NOT EXISTS users(
			userid SERIAL PRIMARY KEY,
			login VARCHAR(30),
			userpassword VARCHAR(100),
			isadmin boolean 
		)`)
	//result check
	result = pool.query(`
		CREATE TABLE IF NOT EXISTS comments(
			commentid SERIAL PRIMARY KEY,
			userid INT, 
			body text,
			articleid INT
		)`)
	return
	result = pool.query(`
		INSERT INTO users (login, userpassword, isadmin) VALUES ('Ivan Kit', '1234567qwe', TRUE)
		`)
	result = pool.query(`
		INSERT INTO articles (title, body, date_of_creation, creatorid, comments) VALUES ('First article!', 'Hello world!
		Its my first article on hacktory.lab!', 2022-07-10, 1, '[]')
		`)
}

module.exports.init = main