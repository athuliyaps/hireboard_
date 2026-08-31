import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { addJob, clearSelectedJob, editJob, fetchJobById } from "../../store/jobs.store"
import { ROUTES } from "../../constant/routePaths"
import { CATEGORY_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "../../constant/jobConstant"

export const JobForm = () => {
  const {id} = useParams()
  const isEditMode = Boolean(id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {selectedJob, loading,error} = useSelector((state)=>state.jobs)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    experienceLevel: '',
    location: '',
    salaryRange: '',
    status: 'active',
  })
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(()=>{
    if(isEditMode){
      dispatch(fetchJobById(id))
    }
    return ()=>{
      dispatch(clearSelectedJob())
    }
  },[dispatch,id,isEditMode])

  useEffect(() => {
    if (isEditMode && selectedJob) {
      setFormData({
        title: selectedJob.title || '',
        description: selectedJob.description || '',
        category: selectedJob.category || '',
        experienceLevel: selectedJob.experienceLevel || '',
        location: selectedJob.location || '',
        salaryRange: selectedJob.salaryRange || '',
        status: selectedJob.status || 'active',
      })
    }
  }, [isEditMode, selectedJob])

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData((prev)=>({...prev,[name]:value}))
  }

  const validate = ()=>{
    const errors = {}
    if(!formData.title.trim()){
      errors.title = 'Title is required'
  }
  if (!formData.description.trim()) {
      errors.description = 'Description is required'
    }
    if (!formData.category) {
      errors.category = 'Category is required'
    }
    if (!formData.experienceLevel) {
      errors.experienceLevel = 'Experience level is required'
    }
    if(!formData.location.trim()){
      errors.location ='Location is required'
    }
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!validate()) return

    const result = isEditMode
    ? await dispatch(editJob({id,jobData:formData}))
    : await dispatch(addJob(formData))
  
    if(
      (isEditMode && editJob.fulfilled.match(result)) ||
      (!isEditMode && addJob.fulfilled.match(result))
    ) {
      navigate(ROUTES.ADMIN_JOBS)
    }
    
  }
  return (
    <>
   <h1 className="text-2xl font-bold text-text mb-1">
    {isEditMode ? 'Edit Job':'Create Job'}
   </h1>
   <p className="text-muted text-sm mb-6">

    {isEditMode ? 
    'Update the job posting details' : 'Fill in the details for the new job posting'}
   </p>

   <form onSubmit={handleSubmit} className="bg-panel border border-border rounded-lg p-6 space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm text-muted mb-1.5">Job Title</label>
          <input
           name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
      {validationErrors.title && <p className="text-danger text-xs mt-1">{validationErrors.title}</p>}

        </div>

      <div>
          <label className="block text-sm text-muted mb-1.5">Description</label>
          <textarea
          name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Job description..."
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
      {validationErrors.description && <p className="text-danger text-xs mt-1">{validationErrors.description}</p>}

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Category</label>
            <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select category</option>
              {
                CATEGORY_OPTIONS.map((item)=>(
              <option key={item} value={item}>{item}</option>

                ))
              }

            </select>
          {validationErrors.category && <p className="text-danger text-xs mt-1">{validationErrors.category}</p>}

          </div>

         <div>
            <label className="block text-sm text-muted mb-1.5">Experience Level</label>
            <select 
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select level</option>
              {EXPERIENCE_LEVEL_OPTIONS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          {validationErrors.experienceLevel && <p className="text-danger text-xs mt-1">{validationErrors.experienceLevel}</p>}
       
          </div>
        </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Kochi, India"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

          {validationErrors.location && <p className="text-danger text-xs mt-1">{validationErrors.location}</p>}

          </div>

         <div>
            <label className="block text-sm text-muted mb-1.5">Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              placeholder="e.g. 6-10 LPA"
              className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
     <div>
          <label className="block text-sm text-muted mb-1.5">Status</label>
          <select 
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-bg border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      {error && <p className="text-danger text-sm">{error}</p>}
 

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
          >
            {loading ? 'Saving...' : 'Save Job'}
          </button>
          <button
            type="button"
            onClick={()=>navigate(ROUTES.ADMIN_JOBS)}
            className="border border-border text-muted text-sm font-medium px-5 py-2.5 rounded-md hover:bg-bg transition-colors"
          >
            Cancel
          </button>
        </div>
</form>
    </>
  )
}