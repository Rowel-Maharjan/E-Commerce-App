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
      state.user = null
    },

    loginUser: (state, action)=>{
      state.isAuthenticated = true,
      state.user = action.payload
    },


  },  
})

export const { registerUser, loginUser } = authSlice.actions

export default authSlice.reducer