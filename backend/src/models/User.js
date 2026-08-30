const { DataTypes } = require("sequelize");
const sequelize =require('../config/database');
const {ROLES} = require("../constants/Constants");

const User = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.ENUM(...Object.values(ROLES)),
        allowNull:false,
    },
},{

    tableName:'users',
    timestamps:true
})

module.exports= User