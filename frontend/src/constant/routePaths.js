export const ROUTES = {
  //admin
  ADMIN_LOGIN: '/admin/login',
  ADMIN_REGISTER:'/user/register',
  ADMIN_DASHBOARD: '/user/dashboard',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_JOB_CREATE: '/admin/jobs/create',
  ADMIN_JOB_EDIT: (id) => `/admin/jobs/edit/${id}`,
  //job and user
  HOME: '/',
  JOB_LISTING: '/jobs',
  JOB_DETAILS: (id) => `/jobs/${id}`,
  USER_LOGIN: '/login',
  USER_REGISTER:'/register',
  MY_APPLICATIONS :'/my-applications'
}