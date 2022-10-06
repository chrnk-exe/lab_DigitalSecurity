const { Comments, Articles } = require('./models');

async function deleteComment(commentid, articleid) {
    const comment = await Comments.destroy({
        where: {
            id: commentid,
        },
    });
    const article = await Articles.findOne({
        where: {
            id: articleid,
        },
    });
    let comments = JSON.parse(article.comments);
    comments = comments.filter(comment => comment !== commentid);
    article.comments = JSON.stringify(comments);
    article.save();
    return true;
}

module.exports = deleteComment;
