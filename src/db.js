// const { Sequelize } = require('./db/models/index');
// const path = require('path');
const { sequelize } = require('./db/models');
// require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });
// const { DB_DATABASE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

// const sequelize = new Sequelize(
//     `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//     {
//         logging: false,
//     },
// );

const test = async () => {
    try {
        await sequelize.authenticate();
        console.log('[DB]: Connection has been established successfully.');
    } catch (error) {
        console.error('[DB]: Unable to connect to the database:', error);
    }
};

test();

module.exports.sequelize = sequelize;
