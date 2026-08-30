const { applyJob, getApplications } = require("../services/applicationService")

const createAppli_controller = async (req,res)=>{
    try{
    const {jobId} = req.body
    const apply = await applyJob(req.user.id,jobId)
    res.status(201).json({
        message:'Application submitted sucessfully',
        data:apply
    })
    }catch(err){
        res.status(err.statusCode || 500).json({message:err.message ||'Failed to submit the application'})
    }

}

const getAppli_controller = async (req,res)=>{
    try{
        const applications = await getApplications(req.user.id)
    res.status(200).json({
        message:'Applications retrived sucessfully',
        data:applications
    })
    }catch(err){
        res.status(err.statusCode || 500).json({message:err.message ||'Failed retrive datas'})
    }
}

module.exports = {createAppli_controller,getAppli_controller}