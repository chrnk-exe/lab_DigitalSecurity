const {Users} = require('./models')

const checkUserRules = async (id) => {
    let result
    if(typeof id === 'string'){
        result = await Users.findOne({
            where: {
                login: id
            }
        })
    } else if(typeof id === 'number'){
        result = await Users.findOne({
            where: {
                id
            }
        })
    }
    try {
        return result.getDataValue('isadmin')
    } catch {
        return false
    }
}

module.exports = checkUserRules