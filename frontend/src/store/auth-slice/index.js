import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isAuthenticated: false,
  user: null
}

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get("http://localhost:3000/api/auth/checkauth",
    {
      withCredentials: true
    })

  return response.data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state) => {
      state.isAuthenticated = false
      state.user = null
    },

    loginUser: (state, action) => {
      state.isAuthenticated = true,
        state.user = action.payload
    },

    // checkAuth: (state, action) => {
    //   state.user = action.payload.user
    //   state.isAuthenticated = true
    // }


  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null
        state.isAuthenticated = action.payload.success
      })
  }
})

export const { registerUser, loginUser } = authSlice.actions

export default authSlice.reducer