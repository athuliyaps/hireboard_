import { AUTH_ENDPOINTS } from '../constant/apiEndpoints'
import axiosInstance from '../utils/axiosInstance'

export const adminLogin = async (credentials) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.ADMIN_LOGIN, credentials)
  return data
}

export const userLogin = async (credentials) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.USER_LOGIN, credentials)
  return data
}

export const userRegister = async (userData) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.USER_REGISTER, userData)
  return data
}

export const logout = async () => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT)
  return data
}