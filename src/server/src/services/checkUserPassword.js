const { Users } = require('./models');
const toPlain = require('./toPlain');

async function checkUserPassword(login, password) {
    const user = await Users.findOne({
        where: {
            login,
            password,
        },
    }).then(toPlain);
    return user ? user : null;
}

module.exports = checkUserPassword;
