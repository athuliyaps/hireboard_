import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createJob, deleteJob, getDashboard, getJobById, getJobs, updateJob } from "../services/jobService"




export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params, { rejectWithValue }) => {
    try {
      const data = await getJobs(params)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs')
    }
  }
)

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getJobById(id)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch job')
    }
  }
)

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const data = await createJob(jobData)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create job')
    }
  }
)

export const editJob = createAsyncThunk(
  'jobs/editJob',
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const data = await updateJob(id, jobData)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update job')
    }
  }
)

export const removeJob = createAsyncThunk(
  'jobs/removeJob',
  async (id, { rejectWithValue }) => {
    try {
      await deleteJob(id)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete job')
    }
  }
)

export const fetchDashboard = createAsyncThunk(
  'jobs/fetchDashboard',
  async(_,{rejectWithValue})=>{
    try{
     const data = await getDashboard()
     return data
    }catch(err){
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch stats')

    }
  }
)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [],
    total: 0,
    currentPage: 1,
    filters: {
      category: '',
      experienceLevel: '',
      search:'',
      dateFrom:'',
      dateTo:''
    },
    count:{total :0,active:0,closed:0},
    selectedJob: null,
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
         state.loading = false
        state.list = action.payload.data.rows
        state.total = action.payload.data.total
        state.currentPage = action.payload.data.page
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedJob = action.payload.data
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.list.unshift(action.payload.data)
      })
      .addCase(editJob.fulfilled, (state, action) => {
        const updatedJob = action.payload.data
        if(updatedJob){
         const index = state.list.findIndex((job) => job.id === updatedJob.id)
        if (index !== -1) state.list[index] = updatedJob
        }
        
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.list = state.list.filter((job) => job.id !== action.payload)
      })
      .addCase(fetchDashboard.fulfilled,(state,action)=>{
        state.count = action.payload.data
      })
  },
})

export const { setFilters, setPage, clearSelectedJob } = jobsSlice.actions
export default jobsSlice.reducer