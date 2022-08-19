const sequelize = require('./db')
const { Users, Articles, Comments } = require('./models')

const toPlain = res => {
    if(Array.isArray(res)) return res.map(el => el.get({plain: true}))
    else return res.get({plain: true})
}

async function checkUser(userLogin, password){
    const users = Users.findAll({
        where: {
            login: userLogin
        }
    }).then(toPlain)
    if((await users).length === 0){
        const newUser = await registerNewUser(userLogin, password).then(toPlain)
        const {login, userid, userpassword, isadmin} = await newUser
        console.log(login, userid, userpassword, isadmin)
        return {
            status: true,
            auth: true,
            info: 'New user',
            name: login,
            password: userpassword,
            isadmin,
            userid
        }
    } else if( (await users).length > 1) {
        return {
            status: false,
            info: 'Duplicate user'
        }
    } else {
        const user = (await users)[0]
        if(user.userpassword === password) {
            return {
                status: true,
                auth: true,
                name: userLogin,
                password: user.userpassword,
                isadmin: user.isadmin,
                userid: user.userid
            }
        } else {
            return {
                status: true,
                auth: false,
                info: 'Incorrect password'
            }
        }
    }
}

checkUser('Loxxxxxx', '12345')

async function registerNewUser(login, password){
    const newUser = await Users.create({
        login: login,
        userpassword: password,
        isadmin: false
    })
    return newUser
}

async function getAllArticles(){
    const articles = Articles.findAll({
        order: [
            ['articleid', 'ASC']
        ]
    }).then(toPlain)
    return articles
}

