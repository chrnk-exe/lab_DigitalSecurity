const { Sequelize } = require('sequelize')
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env')});
const {DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD} = process.env

const sequelize = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
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