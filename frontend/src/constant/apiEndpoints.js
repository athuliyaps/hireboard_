export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH: '/auth/refresh',
}

export const JOB_ENDPOINTS = {
  BASE: '/job',
  BY_ID: (id) => `/job?id=${id}`,
  MUTATION: (id) => `/job/${id}`,
  COUNT: '/job/count'
}

export const APPLICATION_ENDPOINTS = {
  BASE: '/applications',
}