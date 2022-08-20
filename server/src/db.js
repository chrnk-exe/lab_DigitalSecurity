const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/AwesomeBlog', {
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