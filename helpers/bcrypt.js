const bcrypt = require('bcrypt');

let hashPassword = (password) =>{
    return bcrypt.hashSync(password,10)
}

let verifyPassword = (password,hashPassword) => {
    return compareHash = bcrypt.compareSync(password,hashPassword)
};

module.exports = { verifyPassword,hashPassword };