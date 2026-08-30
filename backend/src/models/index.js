const sequelize = require('../config/database')
const User = require('./User');
const Job = require('./Job');
const RefreshToken = require('./RefreshToken');
const Application = require("./Application");


// User.hasMany(Job, { foreignKey: 'createdBy', as: 'postedJobs' })
// Job.belongsTo(User, { foreignKey: 'createdBy', as: 'postedBy' })

User.hasMany(Application, { foreignKey: 'userId', as: 'applications' })
Application.belongsTo(User, { foreignKey: 'userId', as: 'applicant' })

Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' })
Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' })

User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' })
RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user' })

module.exports = {
    sequelize,
    User,
    Job,
    Application,
    RefreshToken
}