import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearSelectedJob, fetchJobById } from '../../store/jobs.store'
import { ROUTES } from '../../constant/routePaths'
import { submitApplication } from '../../store/applications.store'

export const JobDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,error,selectedJob} = useSelector((state)=>state.jobs)
    const {isAuthenticated,role} = useSelector((state)=>state.auth)
    const {loading:applying} = useSelector((state)=>state.applications)

    useEffect(()=>{
        dispatch(fetchJobById(id))
        return ()=>dispatch(clearSelectedJob())
    },[dispatch,id])

    const handleSubmit = async ()=>{
        if(!isAuthenticated || role!=='user'){
    navigate(ROUTES.USER_LOGIN)
    return
        }

        const result = await dispatch(submitApplication(id))

        if(submitApplication.fulfilled.match(result)){
            alert('Application submitted succesfully!')
        }else{
            alert(result.payload || 'Failed to submit application')
        }
    }

    if(loading) return <p className="text-muted text-center py-10">Loading job details...</p>
    if(error) return <p className="text-danger text-center py-10">{error}</p>
    if(!selectedJob) return null


  return (
    <>
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-panel border border-border rounded-lg p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text mb-1">{selectedJob.title}</h1>
            <p className="text-muted text-sm">{selectedJob.location}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              selectedJob.jobStatus === 'active'
                ? 'bg-success/10 text-success'
                : 'bg-danger/10 text-danger'
            }`}
          >
            {selectedJob.status}
          </span>
        </div>

        <div className="flex gap-2 mb-6">
          <span className="bg-bg border border-border px-3 py-1 rounded-md text-muted text-sm">
            {selectedJob.category}
          </span>
          <span className="bg-bg border border-border px-3 py-1 rounded-md text-muted text-sm">
            {selectedJob.experienceLevel}
          </span>
          {selectedJob.salaryRange && (
            <span className="bg-bg border border-border px-3 py-1 rounded-md text-muted text-sm">
              {selectedJob.salaryRange}
            </span>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-text font-semibold mb-2">Job Description</h2>
          <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
            {selectedJob.description}
          </p>
        </div>


        <button
          onClick={handleSubmit}
          disabled={applying || selectedJob.jobStatus !== 'active'}
          className="bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {applying ? 'Submitting...' : selectedJob.jobStatus !== 'active' ? 'Position Closed' : 'Apply Now'}
        </button>
      </div>
    </div>

    </>
  )
}
