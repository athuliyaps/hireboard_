const { where } = require("sequelize")
const { Job } = require("../models")

const createJob = async (job)=>{
    const addJob = await Job.create(job)
    return addJob
}

const getAllJobs = async (query={})=>{
    const {id,category,experienceLevel, status,page=1,limit=10} = query

if(id){
    const job = await Job.findByPk(id)
    if(!job){
        throw Object.assign(new Error ('Job not found'),{statusCode:404})
    }
    return job
}
const offset = (page-1)*limit
const where = {}
if(category) where.category = category
if(experienceLevel) where.experienceLevel = experienceLevel
if(status) where.status = status

const {count,rows}= await Job.findAndCountAll({
    where,
    limit:Number(limit),
    offset:Number(offset),
    order:[['createdAt','DESC']]
})
return {
    message:'Jobs retrived sucessfully',
    data:rows,
    page:Number(page),
    total:count

}
}

const updateJob = async (id,jobData)=>{
  const job = await Job.findByPk(id)
  if(!job){
    throw Object.assign(new Error('Job not found'),{statusCode:404})
  }
  await job.update(jobData)
  return job
}

const deleteJob = async (id)=>{
    const job = await Job.findByPk(id)
    if(!job){
        throw Object.assign(new Error('Job not found'),{statusCode:404})
    }
    await job.destroy()
    return job
}

module.exports={getAllJobs,createJob,updateJob,deleteJob}