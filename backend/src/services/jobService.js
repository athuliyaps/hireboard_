const { Op } = require("sequelize")
const { Job } = require("../models")

const createJob = async (job)=>{
    const addJob = await Job.create(job)
    return addJob
}

const getAllJobs = async (query={})=>{
    const {
        id,
        category,
        experienceLevel, 
        status,
        search, 
        dateFrom, 
        dateTo,
        page=1,
        limit=10
        } = query

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
if(search) where.title = {[Op.iLike]: `%${search}%`}

if(dateFrom || dateTo){
    where.createdAt={}
    if(dateFrom) where.createdAt[Op.gte] = new Date(dateFrom)
    if(dateTo) where.createdAt[Op.lte] = new Date(dateTo)
}

const {count,rows}= await Job.findAndCountAll({
    where,
    limit:Number(limit),
    offset:Number(offset),
    order:[['createdAt','DESC']]
})
return {
    rows,
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

const getDashboard = async ()=>{
    const total = await Job.count()
    const active = await Job.count({
        where:{jobStatus:'active'}
    })
     const closed = await Job.count({
        where:{jobStatus:'closed'}
    })
    return{
        total:total,
        active:active,
        closed:closed
    }
}


module.exports={getAllJobs,createJob,updateJob,deleteJob,getDashboard}