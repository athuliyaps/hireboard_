import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { applyToJob, getMyApplications } from "../services/applicationService"


export const submitApplication = createAsyncThunk(
  'applications/submitApplication',
  async (jobId, { rejectWithValue }) => {
    try {
      const data = await applyToJob(jobId)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to apply')
    }
  }
)

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMyApplications()
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch applications')
    }
  }
)

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    myApplications: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearApplicationStatus: (state) => {
      state.error = null
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = 'Application submitted successfully'
        state.myApplications.push(action.payload)
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.myApplications = action.payload
      })
  },
})

export const { clearApplicationStatus } = applicationsSlice.actions
export default applicationsSlice.reducer