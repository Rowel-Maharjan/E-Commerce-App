import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    productList: []
}

export const addNewProduct = createAsyncThunk("/product/addnewproduct", async (productData) => {
    const response = await axios.post("http://localhost:3000/api/admin/products/addproduct", productData)
    return response.data;
})

export const fetchAllProducts = createAsyncThunk("/product/fetchallproducts", async () => {
    const response = await axios.get("http://localhost:3000/api/admin/products/fetchallproduct")
    return response.data;
})


//This part is tricky. Need to send as a parameter......................Look Down, cant do (id, productData).
//Now check AdminProducts.jsx how I dispatch
export const editProduct = createAsyncThunk("/product/editproduct", async ({id, productData}) => { 
    const response = await axios.put(`http://localhost:3000/api/admin/products/editproduct/${id}`, productData)
    return response.data;

})
export const deleteProduct = createAsyncThunk("/product/deleteproduct", async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/admin/products/deleteproduct/${id}`)
    return response.data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.productList = action.payload.product
            }).addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            })
    }

})

// export const { incrementByAmount } = productSlice.actions

export default productSlice.reducer