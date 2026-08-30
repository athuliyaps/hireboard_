const { registerUser, loginUser, refreshAcessToken } = require("../services/authService")

const register = async (req , res)=>{
    try{
        const user = await  registerUser(req.body)
        res.status(201).json({
            message:'User registered sucessfully',
            user
        
        })

    }catch(err){
        res.status(err.statusCode || 500).json({
            message:err.message || 'Registeration failed'
        })

    }
}

const login = async(req,res)=>{
    try{
        const result = await loginUser(req.body)
        res.status(202).json({
            message:'Login sucessful',
            result
        })

    }catch(err){
    console.error("💥 Login Route Crash Details:", err);

      res.status(err.statusCode || 500).json({message:err.messag || 'Login failed'})
    }
}
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body
    const result = await refreshAcessToken(refreshToken)
    res.status(200).json(result)
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
    message: err.message || 'Token refresh failed' })
  }
}


module.exports={register,login, refresh}
