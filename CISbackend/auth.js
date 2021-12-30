const JWT = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header("token")

    if (!token) {
        return res.status(401).json({message: 'Auth error!'})
    } 

    try {
        const decode = JWT.verify(token, "string")
        req.user = decode.user
        next()
    } catch (err) {
        console.log(`Err: ${err}`)
        res.status(500).send({message: 'Bad token!'})
    }
}