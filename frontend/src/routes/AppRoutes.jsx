import { Route,Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AdminLayout } from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/DashBoard";
import { JobListingAdmin } from "../pages/admin/JobListing";
import { JobForm } from "../pages/admin/JobForm";
import { ROUTES } from "../constant/routePaths";
import { AdminLogin } from "../pages/admin/AdminLogin";
import { FixedLayout } from "../layouts/FixedLayout";
import { Landing } from "../pages/Public/Landing";
import { JobListing } from "../pages/Public/JobListing";
import { JobDetails } from "../pages/Public/JobDetails";
import { Login } from "../pages/Public/Login";
import { Register } from "../pages/Public/Register";


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
            <Route element={<FixedLayout/>}>
            <Route path={ROUTES.USER_LOGIN} element={<Login/>}/>
            <Route path={ROUTES.ADMIN_REGISTER} element={<Register/>}/>
            <Route path={ROUTES.HOME} element={<Landing/>}/>
            <Route path={ROUTES.JOB_LISTING} element={<JobListing/>}/>
             <Route path='/jobs/:id' element={<JobDetails/>}/>


            </Route>
        </Routes>
    )
}
export default AppRoutes