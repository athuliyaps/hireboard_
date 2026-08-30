const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const hashPassword = async (password)=>{
    return await bcrypt.hash(password,SALT_ROUNDS)
}

const comparePassword = async (password,newpassword)=>{
    return await bcrypt.compare(password,newpassword)
}

module.exports = {hashPassword,comparePassword}