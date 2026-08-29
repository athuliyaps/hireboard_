const { DataTypes } = require("sequelize");
const sequelize = require('../config/database')
const User = require('./User');
const { EXPERIENCE, JOB_STATUS } = require("../constants/Constants");

const Job = sequelize.define('Job',{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experienceLevel: {
    type: DataTypes.ENUM(Object.values(EXPERIENCE)),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salaryRange: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  job_status: {
    type: DataTypes.ENUM(Object.values(JOB_STATUS)),
    allowNull: false,
    defaultValue: 'active',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'jobs',
  timestamps: true,
})


module.exports=Job

