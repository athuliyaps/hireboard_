export const ROUTES = {
  ADMIN_LOGIN: '/admin/login',
  ADMIN_REGISTER:'/user/register',
  ADMIN_DASHBOARD: '/user/dashboard',
  ADMIN_JOBS: '/jobs',
  ADMIN_JOB_CREATE: '/jobs/create',
  ADMIN_JOB_EDIT: (id) => `/jobs/edit/${id}`,
  HOME: '/',
  JOB_LISTING: '/jobs',
  JOB_DETAILS: (id) => `/jobs/${id}`,
  USER_LOGIN: '/login',
}