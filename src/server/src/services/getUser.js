const { Users } = require('./models');
const toPlain = require('./toPlain');

const getUser = async id => {
    const user = await Users.findOne({
        where: {
            id,
        },
    }).then(toPlain);
    return user;
};

module.exports = getUser;
