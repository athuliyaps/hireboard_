import { Route,Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/DashBoard";
import { JobListingAdmin } from "../pages/admin/JobListing";
import { JobForm } from "../pages/admin/JobForm";
import { ROUTES } from "../constant/routePaths";
import { AdminLogin } from "../pages/admin/AdminLogin";


function AppRoutes(){
    return(
        <Routes>
            <Route  path={ROUTES.ADMIN_LOGIN} element={<AdminLogin/>}/>
            <Route element={<ProtectedRoute allowedRole="admin"/>}>
            <Route element={<AdminLayout/>}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<Dashboard/>}/>
            <Route path={ROUTES.ADMIN_JOBS} element={<JobListingAdmin/>}/>
            <Route path={ROUTES.ADMIN_JOB_CREATE} element={<JobForm/>}/>
            <Route path="/admin/jobs/edit/:id" element={<JobForm/>}/>
            </Route>
            </Route>
            <Route path={ROUTES.HOME} element={<div>Landing Page</div>}/>
        </Routes>
    )
}
export default AppRoutes