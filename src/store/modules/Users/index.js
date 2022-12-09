import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: '1234',
    name: 'yami',
    type: 'team-leader',
  },
  {
    id: '9876',
    name: 'dimay',
    type: 'admin'
  }
]

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
    removeUser: (state, action) => {
      state.splice(action.payload, 1)
    },
    updateUser: (state, action) => {
      const configToUpdate = action.payload
      const { index, ...userToUpdate } = configToUpdate
      state[index] = userToUpdate
    },
  }
})

export const { addUser, updateUser, removeUser } = usersSlice.actions
export default usersSlice.reducer