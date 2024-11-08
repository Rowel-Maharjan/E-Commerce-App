import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true
}


// AsyncThunk to get user Status such as their info and to make them authenticate even though the page is refreshed. Need to send the get request to receive the status of User.
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {

  const response = await axios.get("http://localhost:3000/api/auth/checkauth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    })

  return response.data
})

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await axios.post("http://localhost:3000/api/auth/logout", {},
    {
      withCredentials: true
    });


  return response.data

})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //When register, authenticity is false
    registerUser: (state) => {
      state.isAuthenticated = false
      state.user = null
    },

    //When login, authenticity is true
    loginUser: (state, action) => {
      state.isAuthenticated = true,
        state.user = action.payload
    },

    //This is another method to make User authenticate even though the page is refreshed
    // checkAuth: (state, action) => {
    //   state.user = action.payload.user
    //   state.isAuthenticated = true
    // }


  },

  extraReducers: (builder) => {
    builder
      // When checkAuth gets the data then it makes isAuthenticated = true and user value obtained from that get request
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : null
        state.isAuthenticated = action.payload.success
        state.isLoading = false
      }).addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true
        state.isAuthenticated = false
      }).addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
      }).addCase(logoutUser.fulfilled, (state) => {
        console.log("I am done")
        state.isLoading = false,
          state.user = null,
          state.isAuthenticated = false
      })
  }
})

export const { registerUser, loginUser } = authSlice.actions

export default authSlice.reducer