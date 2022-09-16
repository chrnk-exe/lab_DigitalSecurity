const {Users} = require('./models')
const toPlain = require('./toPlain')

const renameUser = async (id, name) => {
    await Users.update({login: name}, {
        where: {
            id
        }
    })
    const user = await Users.findAll({
        where:{
            login: name
        }
    }).then(toPlain)
    return user[0].login == name
}

module.exports = renameUser