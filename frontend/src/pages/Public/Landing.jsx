import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constant/routePaths'
import { fetchJobs } from '../../store/jobs.store'
import { CATEGORY_OPTIONS } from '../../constant/jobConstant'


const Card=({job,onClick})=>{
    return(
        <div
        onClick={onClick}
        className="bg-panel border border-border rounded-lg p-5 cursor-pointer hover:border-primary transition-colors"
        >
       <div className='flex items-start justify-between mb-2'>
        <h3 className='text-text font-semibold'>{job.title}</h3>
        <span className='px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success'>{job.jobStatus}</span>

       </div>
     <p className="text-muted text-sm mb-3">{job.location}</p>
      <div className="flex gap-2 text-xs">
        <span className="bg-bg border border-border px-2 py-1 rounded-md text-muted">{job.category}</span>
        <span className="bg-bg border border-border px-2 py-1 rounded-md text-muted">{job.experienceLevel}</span>
      </div>

        </div>
    )
}

export const Landing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {list,loading} =useSelector((state)=>state.jobs)

    useEffect(()=>{
        dispatch(fetchJobs({page:1,limit:10,status:'active'}))
    },[dispatch])

    const getJobdetils = (id)=>navigate(ROUTES.JOB_DETAILS(id))
    console.log('jod details',list);
    

  return (
    <>
<div>
    <section className='bg-panel border-b border-l-border'>
        <div className='max-w-6xl mx-auto px-6 py-20 text-center'>
            <h1 className='text-2xl sm:text-4xl font-bold text-text mb-4'>
          Find Your Next <span className="text-primary">Opportunity</span>
         </h1>
         <p className='text-muted text-lg mb-8 max-w-xl mx-auto'>
            Browse curated job listings across engineering, design, sales, and more

         </p>
         <button
         onClick={()=> navigate(ROUTES.JOB_LISTING)}
         className='bg-primary text-white font-medium px-6 py-3 rounded-md hover:opacity-90 transition-opacity'
         >
         Browse all jobs
         </button>
        </div>
    </section>

    <section className='max-w-6xl mx-auto px-6 py-16'>
        <h2 className='text-2xl font-bold text-text mb-6'>
        Featured Jobs
        </h2>
        {
            loading ? (
    <p className="text-muted">Loading jobs...</p>
          
            ):(
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
         {
            list.map((item)=>(
                <Card 
                key={item.id} 
                job={item}
                onClick={()=>getJobdetils(item.id)}
                />
            ))}
            </div>
            )}
         </section>

    <section className="max-w-6xl mx-auto px-6 py-16 border-t border-border">
        <h2 className="text-2xl font-bold text-text mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CATEGORY_OPTIONS.map((item) => (
            <button
              key={item}
              onClick={() => navigate(`${ROUTES.JOB_LISTING}?category=${item}`)}
              className="bg-panel border border-border rounded-lg p-6 text-left hover:border-primary transition-colors"
            >
              <p className="text-text font-medium">{item}</p>
            </button>
          ))}
        </div>
      </section>
</div>
    </>
  )
}
