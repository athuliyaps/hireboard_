import { Pencil, Plus, Search, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchJobs, removeJob, setFilters, setPage } from "../../store/jobs.store"
import { ROUTES } from "../../constant/routePaths"
import { CATEGORY_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "../../constant/jobConstant"

export const JobListingAdmin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    list,
    total,
    currentPage,
    filters,
    loading,
    error} = useSelector((state)=>state.jobs)

  const limit =10

  useEffect(()=>{
  dispatch(fetchJobs({
    page:currentPage,
    limit,
    ...filters
  }))
  },[dispatch,currentPage,filters])

  const handleChange = (e)=>{
    const {name,value} = e.target;
    dispatch(setFilters({[name]:value}))
    dispatch(setPage(1))
  }

  const handleDelete =(id)=>{
    alert('Are you sure you want to delete this job?')
    dispatch(removeJob(id))
  }

  const handleShowJobs = ()=>{
    if(!list.length) return 'Showing 0 jobs'
    const start = (currentPage - 1) * limit + 1
    const end = (currentPage - 1) * limit + list.length
    return `Showing ${start} - ${end} of ${total} jobs`
  }

  const totalPages = Math.ceil(total/limit)

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text mb-1">Jobs</h1>
          <p className="text-muted text-sm">Manage job postings</p>
        </div>
        <button 
        onClick={()=>navigate(ROUTES.ADMIN_JOB_CREATE)}
        className="flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2.5 rounded-md hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Create Job
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search jobs..."
            className="w-full bg-panel border border-border rounded-md pl-9 pr-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <select 
        value={filters.category}
        name="category"
        onChange={handleChange}
        className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All Categories</option>
          {
            CATEGORY_OPTIONS.map((item)=>(
          <option key={item} value={item}>{item}</option>

            ))
          }
        </select>

        <select 
        value={filters.experienceLevel}
        name="experienceLevel"
        onChange={handleChange}
        className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All Levels</option>
          {
            EXPERIENCE_LEVEL_OPTIONS.map((item)=>(
          <option key={item} value={item}>{item}</option>

            ))
          }  
        </select>
      </div>
      {loading && <p className="text-muted text-sm mb-4">Loading jobs...</p>}
      {error && <p className="text-danger text-sm mb-4">{error}</p>}

{!loading && !error &&(
  <>

      <div className="bg-panel border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-muted text-left">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Experience</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            { list.map((job) => (
              <tr key={job.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text">{job.title}</td>
                <td className="px-4 py-3 text-muted">{job.category}</td>
                <td className="px-4 py-3 text-muted">{job.experienceLevel}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      job.jobStatus === 'active'
                        ? 'bg-success/10 text-success'
                        : 'bg-danger/10 text-danger'
                    }`}
                  >
                    {job.jobStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button 
                    onClick={()=>navigate(ROUTES.ADMIN_JOB_EDIT(job.id))}
                    className="p-1.5 rounded-md text-muted hover:bg-bg hover:text-primary transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button 
                    onClick={()=> handleDelete(job.id)}
                    className="p-1.5 rounded-md text-muted hover:bg-bg hover:text-danger transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </>
)}


      <div className="flex items-center justify-between mt-4">
        <p className="text-muted text-sm">{handleShowJobs()}</p>
        <div className="flex gap-1">
          <button 
          disabled={currentPage <= 1}
          onClick={()=>dispatch(setPage(currentPage-1))}
          className="px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-md bg-primary text-white text-sm">{currentPage}</button>
          <button 
          disabled={currentPage >= totalPages}
          onClick={()=>dispatch(setPage(currentPage + 1))}
          className="px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel">
            Next
          </button>
        </div>
      </div>

    </>
  )
}

