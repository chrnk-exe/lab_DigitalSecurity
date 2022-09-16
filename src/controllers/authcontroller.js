const authController = async(req, res, next) => {
    // console.log(
    //     '[server]: req.session.session_token is ' + req.session.session_token + '\n',
    //     '[server]: authController: ' + req.url
    // )
    if(req.session.session_token){
        next()
    } else {
        res.status(403).end()
    }
}

module.exports = authController