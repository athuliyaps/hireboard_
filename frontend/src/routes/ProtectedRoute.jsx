import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { ROUTES } from "../constant/routePaths"
import { Navigate } from "react-router-dom"


function ProtectedRoute({ allowedRole }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to={allowedRole === 'admin' ? ROUTES.ADMIN_LOGIN : ROUTES.USER_LOGIN} replace />
  }

  if (role !== allowedRole) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <Outlet />
}

export default ProtectedRoute