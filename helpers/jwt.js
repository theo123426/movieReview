const jwt = require("jsonwebtoken")

let generateToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_TOKEN,{expiresIn:'365d'})
}

let verifyToken = (token) =>{
    return jwt.verify(token,process.env.JWT_TOKEN)
}
module.exports = {generateToken,verifyToken}