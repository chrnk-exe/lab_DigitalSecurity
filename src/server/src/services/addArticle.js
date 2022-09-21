const { Articles } = require('./models');

async function addArticle(info) {
    const { userid, title, body, year, month, day, description } = info;
    const date = new Date(`${year}, ${month}, ${day + 1}`);
    Articles.create({
        creatorid: userid,
        title,
        body,
        comments: '[]',
        date_of_creation: date,
        description,
    });
}

module.exports = addArticle;
