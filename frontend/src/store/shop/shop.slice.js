import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null
}

export const fetchAllFilteredProducts = createAsyncThunk("/product/fetchallfilteredproducts", async ({ filterParams, sortParams }) => {
    const queryParams = { ...filterParams, sortBy: sortParams }
    const finalQuery = new URLSearchParams(queryParams)
    const response = await axios.get(`http://localhost:3000/api/shop/products/fetchallproduct/?${finalQuery}`)
    return response.data;
})

export const fetchFilteredProductDetails = createAsyncThunk("/product/fetchfilteredproductdetails", async (id) => {
    const response = await axios.get(`http://localhost:3000/api/shop/products/fetchallproduct/${id}`)
    return response.data;
})

export const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state) => {
            state.productDetails = null
        }
    },
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
            }).addCase(fetchFilteredProductDetails.fulfilled, (state, action) => {
                state.productDetails = action.payload.product,
                    state.isLoading = false
            })
    }

})

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer
