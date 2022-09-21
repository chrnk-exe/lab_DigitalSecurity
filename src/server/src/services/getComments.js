const { Articles, Comments, Users } = require('./models');
const toPlain = require('./toPlain');

async function getComments(id) {
    const article = await Articles.findOne({
        where: {
            id,
        },
        attributes: ['comments'],
    }).then(toPlain);

    let commentsList = JSON.parse(article.comments);
    if (commentsList.length > 0) {
        const commentsPool = await Comments.findAll({
            where: {
                id: commentsList,
            },
        }).then(toPlain);
        const useridComments = commentsPool.map(comment => comment.userid);
        const names = await Users.findAll({
            where: {
                id: useridComments,
            },
            attributes: ['id', 'login', 'isadmin'],
        }).then(toPlain);
        const comments = commentsPool.map(comment => ({
            name: names.find(name => name.id == comment.userid).login,
            isadmin: names.find(name => name.id == comment.userid).isadmin,
            ...comment,
        }));
        return comments;
    } else {
        return [];
    }
}

module.exports = getComments;
