import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state) => {
      state.isAuthenticated = false
      state.user = "user"
    },
  },  
})

export const { registerUser } = authSlice.actions

export default authSlice.reducer