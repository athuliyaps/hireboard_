import { APPLICATION_ENDPOINTS } from "../constant/apiEndpoints"
import axiosInstance from "../utils/axiosInstance"

export const applyToJob = async (jobId) => {
  const { data } = await axiosInstance.post(APPLICATION_ENDPOINTS.BASE, { jobId })
  return data
}

export const getMyApplications = async () => {
  const { data } = await axiosInstance.get(APPLICATION_ENDPOINTS.BASE)
  return data
}