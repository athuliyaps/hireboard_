import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login as loginService } from "../services/authService";

export const loginThunk = createAsyncThunk(
    'auth/login',
    async(credentials,{rejectWithValue})=>{
    try{
        const data = await loginService(credentials)
        localStorage.setItem('accessToken',data.accessToken)
        localStorage.setItem('refreshToken',data.refreshToken)
        return data

    }catch(err){
        return rejectWithValue(err.response?.data?.message || 'Login failed')
    }
    }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
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
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.role = action.payload.user.role
      })
      .addCase(loginThunk.rejected, (state, action) => {
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

