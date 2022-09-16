const { Articles } = require('./models')
const toPlain = require('./toPlain')

async function getArticle(id){
    const article = await Articles.findOne({
        where: {
            id
        }
    }).then(toPlain)
    return article
} 

module.exports = getArticle