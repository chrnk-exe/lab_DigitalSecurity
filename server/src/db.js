const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

// delete it on prod 
const name = "postgres"
const password = "qwerty"
const DBName = "AwesomeBlog"
const host = "localhost"
const DBPort = 5432

const sequelize = new Sequelize(`postgres://${name}:${password}@${host}:${DB_Port}/${DBName}`, {
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