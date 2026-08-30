const { Job, Application } = require("../models")

const applyJob = async (userId,jobId)=>{
    const job = await Job.findByPk(jobId)
    if(!job){
        throw Object.assign(new Error('Job not found'),{statusCode:404});
        
    }
    const existingApplication = await Application.findOne({where:{userId,jobId}})
    if(existingApplication){
        throw Object.assign(new Error('You have already applied to the job'),{statusCode:400})
    }
    const application = await Application.create({userId,jobId})
    return application
}

const getApplications = async (userId)=>{
    const application = await Application.findAll({
        where:{userId},
        include:[{model:Job, as:'job'}],
        order:[['createdAt','DESC']]
    })
    return application
}

module.exports = {applyJob, getApplications}