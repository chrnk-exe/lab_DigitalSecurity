const { Comments, Articles }= require('./models')

async function addComment(userid, body, articleid){
    const newComment = await Comments.create({
        userid,
        body,
        articleid
    })
    const article = await Articles.findOne({
        where: {
            id: articleid
        }
    })
    const comments = JSON.parse(article.comments)
    comments.push(newComment.id)
    article.comments = JSON.stringify(comments)
    article.save()
}

module.exports = addComment