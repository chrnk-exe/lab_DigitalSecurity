const { Sequelize } = require('sequelize')

// delete it on prod 
const name = "postgres"
const password = "qwerty"
const DBName = "AwesomeBlog"
const host = "localhost"
const DBPort = 5432

const old = `postgres://${name}:${password}@${host}:${DBPort}/${DBName}`

const sequelize = new Sequelize('postgres://postgres:qwerty@pg:5432/AwesomeBlog', {
	logging: false
})

const test = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

test()

module.exports = sequelize