export const ROUTES = {
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_JOB_CREATE: '/admin/jobs/create',
  ADMIN_JOB_EDIT: (id) => `/admin/jobs/edit/${id}`,

  HOME: '/',
  JOB_LISTING: '/jobs',
  JOB_DETAILS: (id) => `/jobs/${id}`,
  USER_LOGIN: '/login',
}