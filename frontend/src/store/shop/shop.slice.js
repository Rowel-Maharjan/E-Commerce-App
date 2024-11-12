import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk("/product/fetchallfilteredproducts", async ({ filterParams, sortParams }) => {
    const queryParams = { ...filterParams, sortBy: sortParams }
    const finalQuery = new URLSearchParams(queryParams)
    const response = await axios.get(`http://localhost:3000/api/shop/products/fetchallproduct/?${finalQuery}`)
    return response.data;
})

export const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.productList = action.payload.product
            }).addCase(fetchAllFilteredProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            })
    }

})

export default shoppingProductSlice.reducer
