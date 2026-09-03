import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMyApplications } from '../../store/applications.store'
import { ROUTES } from '../../constant/routePaths'


export const MyApplications = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {myApplications , loading} = useSelector((state)=>state.applications)

    useEffect(()=>{
        dispatch(fetchMyApplications())
    },[dispatch])
    console.log("My applications",myApplications);
    

  return (
    <>
    <div className='max-w-3xl mx-auto px-6 py-10'>
        <h1 className='text-2xl font-bold text-text mb-6'>
           My applications 
        </h1>
        {
            loading && <p className='text-muted'>Loading...</p>
        }
        {
            !loading && myApplications.length === 0 && (
                <p className='text-muted'>You haven't applied to any jobs</p>
            )
        }
        <div className="space-y-3">
            {
                myApplications.map((item)=>(
                     <div
                     key={item.id}
                     onClick={()=>navigate(ROUTES.JOB_DETAILS(item.job.id))}
                     className="bg-panel border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors flex items-center justify-between">
                <div>
                    <p className="text-text font-medium">{item.job?.title}</p>
                    <p className="text-muted text-sm">{item.job?.location}</p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{item.status}</span>
            </div>

                ))
            }
           
        </div>
    </div>
    </>
  )
}
