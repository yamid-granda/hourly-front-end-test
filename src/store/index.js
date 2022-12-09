import { configureStore } from '@reduxjs/toolkit'
import { temperatureSlice } from './modules/Temperature'
import usersReducer from './modules/Users'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    temperature: temperatureSlice
  },
})
