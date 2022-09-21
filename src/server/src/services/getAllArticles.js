const { Articles } = require('./models');
const toPlain = require('./toPlain');

async function getAllArticles(page) {
    const count = (await Articles.findAll()).length;
    const arr = [];
    for (
        let i = count - (page - 1) * 10;
        i >= count - (page - 1) * 10 - 9;
        i--
    ) {
        arr.push(i);
    }
    const articles = await Articles.findAll({
        where: {
            id: arr,
        },
        order: [['id', 'DESC']],
    }).then(toPlain);
    return { articles: articles, maxArticles: count };
}

module.exports = getAllArticles;
