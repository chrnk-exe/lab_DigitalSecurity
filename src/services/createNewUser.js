const toPlain = require('./toPlain')
const { Users } = require('./models')

async function registerNewUser(login, password){
    const newUser = await Users.create({
        login: login,
        password: password,
        isadmin: false
    }).then(toPlain)
    return newUser
}

module.exports = registerNewUser