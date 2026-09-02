const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message:'Access token required'
        })
    }
    const token = authHeader.split(' ')[1]

    try{
        const result  = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = result
        next()
    }catch(error){
        console.log('APPLY ACCESS TOKEN ERROR:', error.message)
        return res.status(401).json({
            message:'Invalid or expired acesstoken'
        })
    }
}

const authorize = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:'Access denied'})
        }
        next()
    }
}

module.exports={authenticate,authorize}