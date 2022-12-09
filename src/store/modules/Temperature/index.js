import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  grades: '',
  scale: null
}

export const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    addTemperature: (state, action) => {
      state.grades = action.payload.grades
      state.scale = action.payload.scale
    },
  }
})

export const { addTemperature } = temperatureSlice.actions
export default temperatureSlice.reducer