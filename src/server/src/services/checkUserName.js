const { Users }= require('./models')
const toPlain = require('./toPlain')

const checkUserName = async (name) => {
    const result = await Users.findOne({
        where: {
            login: name
        }
    }).then(toPlain)
    return result ? true : false
}

module.exports = checkUserName