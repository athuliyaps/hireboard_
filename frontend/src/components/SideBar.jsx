import { LayoutDashboard,Briefcase, LogOut} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../constant/routePaths'


export const SideBar = ({onLogout}) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted hover:bg-panel hover:text-text'
    }`

  return (
    <>
    <aside className="w-64 bg-sidebar border-r border-border min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <h1 className="text-xl font-bold text-text">
          Hire<span className="text-primary">Board</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <NavLink to={ROUTES.ADMIN_DASHBOARD} className={linkClasses}>
         <LayoutDashboard size={18}/>
         DashBoard
        </NavLink>
        <NavLink to={ROUTES.ADMIN_JOBS} className={linkClasses}>
          <Briefcase size={18}/> Jobs
        </NavLink>
      </nav>
      <div className="px-3 py-4 border-t border-border">
        <button onClick={onLogout}
         className="flex items-center gap-3 px-4 py-2.5 w-full rounded-md text-sm font-medium text-muted hover:bg-panel hover:text-danger transition-colors"
          >
        <LogOut size={18}/>
        Logout
        </button>
      </div>
    </aside>
    </>
  )
}
