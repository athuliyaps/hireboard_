const { compare } = require("bcrypt")
const { ROLES } = require("../constants/Constants")
const { User, RefreshToken } = require("../models")
const { hashPassword, comparePassword } = require("../utils/hashPassword")
const { generateTokens, generateRefreshToken } = require("../utils/generateTokens")
const jwt = require('jsonwebtoken')


const registerUser = async ({name,email,password})=>{
    const existingUser = await User.findOne({where:{email}})
    if(existingUser){
        throw Object.assign(new Error('User already registered'),{statusCode:400})
    }
    const passwordHash = await hashPassword(password)
    const newUser = await User.create({
        name,
        email,
        password:passwordHash,
        role:ROLES.USER
    })
    return {
        id:newUser.id , 
        name:newUser.name, 
        email:newUser.email,
        role:newUser.role
    }
}

const loginUser = async({email,password,role})=>{
    const user = await User.findOne({where:{email}})
    if(!user){
        throw Object.assign(new Error('Invalid email or password'),{statusCode:400})
    }
    if(role && user.role !==role){
         throw Object.assign(new Error('Access denied for this role'),{statusCode:400}) 
    }
    const isMatch = await comparePassword(password,user.password)
    if(!isMatch){
         throw Object.assign(new Error('Invalid email or password'),{statusCode:401})
    }
    const acessToken = generateTokens(user)
    const refreshToken = generateRefreshToken(user)

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await RefreshToken.create({
        userId:user.id,
        token:refreshToken,
        expiresAt
    })
    return {
        acessToken,
        refreshToken,
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    }
}

const refreshAcessToken = async(refreshToken)=>{
    if(!refreshToken){
        throw Object.assign(new Error('Refresh token required'),{statusCode: 401})
    }
    const storedToken = await RefreshToken.findOne({where:{token:refreshToken}})
    if(!storedToken){
        throw Object.assign(new Error('Invalid refresh token'),{statusCode: 403})
    }
    if(new Date()>storedToken.expiresAt){
        await storedToken.destroy()
        throw Object.assign(new Error('Refresh token expired'), { statusCode: 403 })
    }
    let decoded
     try {
        decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (err) {
        
        throw Object.assign(new Error('Invalid or expired refresh token'), { statusCode: 403 })
    }

     const user = await User.findByPk(decoded.id)
      if (!user) {
       throw Object.assign(new Error('User not found'), { statusCode: 404 })
      }

    const newAccessToken = generateTokens(user)

       return { accessToken: newAccessToken }
}

module.exports={registerUser,loginUser,refreshAcessToken}