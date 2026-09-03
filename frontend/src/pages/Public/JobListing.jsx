import { Search } from 'lucide-react'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { fetchJobs, setFilters, setPage } from '../../store/jobs.store'
import { CATEGORY_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from '../../constant/jobConstant'
import { ROUTES } from '../../constant/routePaths'

export const JobListing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const {list,total,currentPage, filters,loading,error} = useSelector((state)=>state.jobs)
    const limit = 10

    useEffect(()=>{
        const categoryURL = searchParams.get('category')
        if(categoryURL){
            dispatch(setFilters({category:categoryURL}))
        }

    },[])

    useEffect(()=>{
        dispatch(fetchJobs({
            page:currentPage,
            limit,
            jobStatus:'active',
            ...filters
        }))
    },[dispatch,currentPage,filters])
    console.log('Job Listing',list);
    

    const handleChange = (e)=>{
        const {name,value} = e.target
        dispatch(setFilters({[name]:value}))
        dispatch(setPage(1))
    }
  const totalPages = Math.ceil(total/limit)

  return (
    <>
    <div className='max-w-6xl mx-auto px-6 py-10'>
     <h1 className='text-2xl font-bold text-text mb-1'>Browse Jobs</h1>
     <p className='text-muted text-sm mb-6'>{total} open positions</p>



     <div className='flex flex-wrap gap-3 mb-6'>
        <div className='relative flex-1 min-w-[200px]'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted'/>
          <input
           type='text'
           name='search'
           value={filters.search}
           onChange={handleChange}
           placeholder='Search'
           className='w-full bg-panel border border-border rounded-md pl-9 pr-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        <select
        type='text'
           name='category'
           value={filters.category}
           onChange={handleChange}
           className='bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
        
        >
            <option value="">All Categories</option>
            {
                CATEGORY_OPTIONS.map((item)=>(
                    <option key={item} value={item}> {item}</option>
                ))
            }
        </select>
         <select
         type='text'
           name='experienceLevel'
           value={filters.experienceLevel}
           onChange={handleChange}
           className='bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary'
        
         >
            <option value="">Experience</option>
             {
                EXPERIENCE_LEVEL_OPTIONS.map((item)=>(
                    <option key={item} value={item}> {item}</option>
                ))
            }

        </select>
     </div>
{
    loading && 
    <p className="text-muted text-sm mb-4">Loading jobs...</p>
}
{
    error && 
    <p className="text-danger text-sm mb-4">{error}</p>
}

{
    !loading && !error && (
        <>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
            {
                list.map((job)=>(
            <div  
            key={job.id}
            onClick={()=>navigate(ROUTES.JOB_DETAILS(job.id))}
            className='bg-panel border border-border rounded-lg p-5 cursor-pointer hover:border-primary transition-colors'>
            <h3 className="text-text font-semibold mb-2">{job.title}</h3>
            <p className="text-muted text-sm mb-3">{job.location}</p>
            <div className="flex gap-2 text-xs">
                <span className="bg-bg border border-border px-2 py-1 rounded-md text-muted">{job.category}</span>
                <span className="bg-bg border border-border px-2 py-1 rounded-md text-muted">{job.experienceLevel}</span>
            </div>
        </div>

                ))
            }
        
     </div>

     {
        list.length === 0 && (
        <p className="text-muted text-center py-10">No jobs match your filters.</p>

        )
     }

     <div className="flex items-center justify-center gap-1">
        <button
        disabled={currentPage <=1}
        onClick={()=>dispatch(setPage(currentPage-1))}
        className='px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel disabled:opacity-40'
        >
       Previous
     </button>
     <button 
     className="px-3 py-1.5 rounded-md bg-primary text-white text-sm">
      {currentPage}
     </button>
     <button 
     disabled={currentPage >= totalPages}
     onClick={()=>dispatch(setPage(currentPage+1))}
     className="px-3 py-1.5 rounded-md border border-border text-muted text-sm hover:bg-panel disabled:opacity-40"
     >
        Next
     </button>
     </div>
        
        </>
    )
}

     
    </div>
    </>
  )
}
