const { sequelize } = require('./db/models');

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
