import { AUTH_ENDPOINTS } from '../constant/apiEndpoints'
import axiosInstance from '../utils/axiosInstance'

export const login = async (credentials) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials)
    console.log('LOGIN RESPONSE DATA:', data)   

  return data
}

export const register = async (userData) => {
  const { data } = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData)
  return data
}

