const { Users } = require('./models');
const toPlain = require('./toPlain');

const updatePassword = async (login, newPassword) => {
    await Users.update(
        {
            password: newPassword,
        },
        {
            where: {
                login,
            },
        },
    );
    const user = await Users.findAll({
        where: {
            login,
        },
    }).then(toPlain);
    try {
        return user[0].password == newPassword;
    } catch {
        return false;
    }
};

module.exports = updatePassword;
