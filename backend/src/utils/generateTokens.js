const jwt = require('jsonwebtoken')

const generateTokens = (user)=>{
    const results = jwt.sign(
        {id:user.id, role:user.role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:process.env.JWT_ACCESS_EXPIRY}
    )
    return results
}

const generateRefreshToken =(user)=>{
    const results = jwt.sign(
        {id:user.id, role:user.role},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:process.env.JWT_REFRESH_EXPIRY}
    )
    return results

}

module.exports = {generateTokens,generateRefreshToken}