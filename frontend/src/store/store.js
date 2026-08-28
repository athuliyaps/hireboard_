import authReducer from './auth.store'
import jobsReducer from './jobs.store'
import applicationReducer from './applications.store'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationReducer,
  },
})