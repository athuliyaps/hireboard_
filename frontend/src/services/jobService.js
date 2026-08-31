import { JOB_ENDPOINTS } from '../constant/apiEndpoints'
import axiosInstance from '../utils/axiosInstance'

export const getJobs = async (params) => {
  const { data } = await axiosInstance.get(JOB_ENDPOINTS.BASE, { params })
  return data
}

export const getJobById = async (id) => {
  const { data } = await axiosInstance.get(JOB_ENDPOINTS.BY_ID(id))
  return data
}

export const createJob = async (jobData) => {
  const { data } = await axiosInstance.post(JOB_ENDPOINTS.BASE, jobData)
  return data
}

export const updateJob = async (id, jobData) => {
  const { data } = await axiosInstance.put(JOB_ENDPOINTS.MUTATION(id), jobData)
  return data
}

export const deleteJob = async (id) => {
  const { data } = await axiosInstance.delete(JOB_ENDPOINTS.MUTATION(id))
  return data
}

export const getDashboard = async ()=>{
  const {data} = await axiosInstance.get(JOB_ENDPOINTS.COUNT)
  return data
}