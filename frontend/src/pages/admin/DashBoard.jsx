import { Briefcase, CheckCircle, Search, XCircle } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDashboard, fetchJobs, setFilters, setPage } from "../../store/jobs.store"
import { CATEGORY_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "../../constant/jobConstant"

function Card({label,value,icon:Icon,colorClass}){
    return(
        <div className="bg-panel border border-border rounded-lg p-6 flex items-center gap-4">
       <div className={`p-3 rounded-md bg-bg ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-muted text-sm">{label}</p>
        <p className="text-text text-2xl font-bold">{value}</p>
      </div>
        </div>
    )
}

function Dashboard(){
    const dispatch = useDispatch()
    const {list,total,currentPage,filters,count,loading,error} = useSelector((state)=>state.jobs)
    const limit = 10

    useEffect(()=>{
        dispatch(fetchDashboard())
    },[dispatch])

    useEffect(()=>{
        dispatch(fetchJobs({page:currentPage,limit,...filters}))
    },[dispatch,currentPage,filters])

    const handleChange = (e)=>{
        const {name,value} = e.target
        dispatch(setFilters({[name]:value}))
        dispatch(setPage(1))
    }

   return(
    <>
        <h1 className="text-2xl font-bold text-text mb-1">Dashboard</h1>
        <p className="text-muted text-sm mb-6">Overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card label="Total Jobs" value={count.total} icon={Briefcase} colorClass="text-primary"/>
            <Card label="Active Jobs" value={count.active} icon={ CheckCircle} colorClass="text-success"/>
             <Card label="Closed Jobs" value={count.closed} icon={XCircle} colorClass="text-danger"/>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
         <div className="relative flex-1 min-w-[200px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
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
         name="category" 
         value={filters.category}
         onChange={handleChange}
         className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
         >
            <option value="">All Categories</option>
           {
            CATEGORY_OPTIONS.map((item)=>(
                <option key={item} value={item}>{item}</option>
            ))
           }
         </select>

            <select 
         name="experienceLevel" 
         value={filters.experienceLevel}
         onChange={handleChange}
         className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
         >
            <option value="">Experience</option>
           {
            EXPERIENCE_LEVEL_OPTIONS.map((item)=>(
                <option key={item} value={item}>{item}</option>
            ))
           }
         </select>
         <input
         type="date"
         name="dateFrom"
         value={filters.dateFrom}
         onChange={handleChange}
         className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
         />
        <input
         type="date"
         name="dateTo"
         value={filters.dateTo}
         onChange={handleChange}
         className="bg-panel border border-border rounded-md px-3 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
         />
        </div>
        {
            loading && <p className="text-muted text-sm mb-4">Loading Jobs...</p>

        }
        {
            error && <p className="text-danger text-sm mb-4">{error}</p>
        }
        {
            !loading && !error && (
                <div className="bg-panel border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border text-muted text-left" >
                                 <th className="px-4 py-3 font-medium">Title</th>
                                 <th className="px-4 py-3 font-medium">Category</th>
                                  <th className="px-4 py-3 font-medium">Experience</th>
                                 <th className="px-4 py-3 font-medium">Posted on</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                            </tr>
                        </thead>
                   <tbody>
                    {
                        list.map((item)=>(
                            <tr key={item.id} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 text-text">{item.title}</td>
                            <td className="px-4 py-3 text-text">{item.category}</td>
                            <td className="px-4 py-3 text-text">{item.experienceLevel}</td>
                            <td className="px-4 py-3 text-text">{new Date (item.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3 text-text">
                                <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.jobStatus === 'active'
                          ? 'bg-success/10 text-success'
                          : 'bg-danger/10 text-danger'
                      }`}
                    >
                      {item.jobStatus}
                                    
                                </span>
                            </td>

                            </tr>
                        ))
                    }
                   </tbody>
                    </table>

                </div>
            )
        }
    </>
   )

}

export default Dashboard