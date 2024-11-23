import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addNewAddress = createAsyncThunk("/addresses/addNewAddress", async ({ userID, formData }) => {
    const response = await axios.post("http://localhost:3000/api/shop/account/add", { userID, formData })
    return response.data
})
export const fetchAllAddresses = createAsyncThunk("/addresses/fetchAllAddresses", async ({ userID }) => {
    const response = await axios.get(`http://localhost:3000/api/shop/account/fetch/${userID}`)
    return response.data
})
export const editAddress = createAsyncThunk("/addresses/editAddress", async ({ userID, addressID, formData }) => {
    const response = await axios.put("http://localhost:3000/api/shop/account/edit", { userID, addressID, formData })
    return response.data
})
export const deleteAddress = createAsyncThunk("/addresses/deleteAddress", async ({ userID, addressID }) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/account/delete/${userID}/${addressID}`)
    return response.data
})



export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.address
            })
            .addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchAllAddresses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false
                state.addressList = action.payload.address
            })
            .addCase(fetchAllAddresses.rejected, (state) => {
                state.isLoading = false
                state.addressList = []
            })
    }
})

export default addressSlice.reducer