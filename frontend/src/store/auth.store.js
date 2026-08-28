import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin, logout as logoutService, userLogin } from "../services/authService";

export const loginAdmin = createAsyncThunk(
    'auth/loginAdmin',
    async(credentials,{rejectWithValue})=>{
    try{
        const data = await adminLogin(credentials)
        localStorage.setItem('accessToken',data.accessToken)
        localStorage.setItem('refreshToken',data.refreshToken)
        return data

    }catch(err){
        return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
    }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await userLogin(credentials)
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
  }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await logoutService()
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    role: null, 
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.admin
        state.role = 'admin'
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.role = 'user'
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
        state.role = null
        state.isAuthenticated = false
      })
  },
})

export default authSlice.reducer

