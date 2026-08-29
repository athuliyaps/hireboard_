require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./src/models')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.json({message:"HireBoard API is running"})
})

const PORT = process.env.PORT || 5000

const server = async()=>{
    try{
  await sequelize.authenticate()
  console.log(`DB ${process.env.DB_NAME} connected sucessfully`);
  
  app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`);
  })

    }catch(err){
     console.error('Unable to connect to the databse', err.message);
     
    }
}
server()