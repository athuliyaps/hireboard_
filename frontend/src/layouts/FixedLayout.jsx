import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routePaths'
import { logoutThunk } from '../store/auth.store'

export const FixedLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuthenticated,user,role} = useSelector((state)=>state.auth)

    const handleLogout = ()=>{
        dispatch(logoutThunk())
        navigate(ROUTES.HOME)
    }

  return (
    <>
    <div className="min-h-screen bg-bg flex flex-col w-full overflow-x-hidden">
      <header className="border-b border-border bg-panel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link to={ROUTES.HOME} className="text-xl font-bold text-text">
            Hire<span className="text-primary">Board</span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-6 text-sm">
            <Link to={ROUTES.JOB_LISTING} className="text-sm text-muted hover:text-text transition-colors">
              Browse Jobs
            </Link>
            {isAuthenticated && role === 'user' ? (
              <>
              <Link to={ROUTES.MY_APPLICATIONS} className="text-sm text-muted hover:text-text transition-colors" >
             My applications
              </Link>
                <span className="text-sm text-muted">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-muted hover:text-danger transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={ROUTES.USER_LOGIN}
                className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-panel mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-muted text-sm">
          2026 HireBoard.
        </div>
      </footer>
    </div>
    </>
  )
}



