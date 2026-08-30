const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')
const User = require('./User');
const Job = require('./Job');
const { APPLY_STATUS } = require("../constants/Constants");

const Application = sequelize.define('Application',{
     id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  jobId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id',
    },
  },
  applyStatus:{
   type: DataTypes.ENUM(...Object.values(APPLY_STATUS)),
    allowNull: false,
    defaultValue: APPLY_STATUS.PENDING,
  },

  },{
    tableName: 'applications',
  timestamps: true,
  }

)

module.exports=Application