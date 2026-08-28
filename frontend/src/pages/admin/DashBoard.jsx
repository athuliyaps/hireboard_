import { Briefcase, CheckCircle, XCircle } from "lucide-react"

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
   return(
    <div>
        <h1 className=""></h1>
        <p></p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card label="Total Jobs" value={24} icon={Briefcase} colorClass="text-primary"/>
            <Card label="Active Jobs" value={18} icon={ CheckCircle} colorClass="text-success"/>
             <Card label="Closed Jobs" value={6} icon={XCircle} colorClass="text-danger"/>

        </div>
    </div>
   )

}

export default Dashboard