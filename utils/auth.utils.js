const jwt = require('jsonwebtoken')

exports.createJWT = (email, userID, duration) => {
    const payload = {
        email,
        userID,
        duration
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: duration
    })
}