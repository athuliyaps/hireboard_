const { getAllJobs, createJob, updateJob,deleteJob } = require("../services/jobService")


const createController = async (req,res)=>{
    try{
    const add = await createJob(req.body)
    res.status(201).json({
        message:'Job created sucessfully',
        data:add
    })

    }catch(err){
  res.status(err.statusCode || 500).json({message:err.message||'Failed creating job'})
    }
}




const getController = async (req,res)=>{
    try{
      const job = await getAllJobs(req.query)
      return res.status(200).json(job)
    }catch(err){
      return res.status(err.statusCode || 500).json({
        message:err.message || 'Failed to fetch job data'
      })
    }
}

const updateController = async (req,res)=>{
   try{
     const job = await updateJob(req.params.id,req.body)
    res.status(200).json({
      message:'Job updated sucessfully',
      data:job
    })
   }catch(err){
    res.status(err.statusCode || 500).json({
      message:'Error upadting the job'
    })
   }
}

const deleteController = async (req,res)=>{
 try{
   const job =await deleteJob(req.params.id)
  res.status(200).json({
    message:'job deleted sucessfully.',
    job
  })
 }catch(err){
  res.status(err.statusCode || 500).json({message:err.message || 'Failed to delete job' })
 }

}

module.exports={createController,getController,updateController,deleteController}