export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AUTH_ENDPOINTS = {
  ADMIN_LOGIN: '/auth/admin/login',
  USER_LOGIN: '/auth/user/login',
  USER_REGISTER: '/auth/user/register',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
}

export const JOB_ENDPOINTS = {
  BASE: '/jobs',
  BY_ID: (id) => `/jobs/${id}`,
}

export const APPLICATION_ENDPOINTS = {
  BASE: '/applications',
}