import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    cartItems: [],
}

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userID, productID, quantity }) => {
    const response = await axios.post(`http://localhost:3000/api/shop/carts/add`, { userID, productID, quantity })

    return response.data
})

export const fetchCartItems = createAsyncThunk("cart/fethcartitems", async (userID) => {
    const response = await axios.get(`http://localhost:3000/api/shop/carts/get/${userID}`)
    return response.data
})

export const deleteCartItems = createAsyncThunk("cart/deletecartitems", async ({ userID, productID }) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/carts/delete/${userID}/${productID}`)

    return response.data
})
export const updateCartItems = createAsyncThunk("cart/updatecartitems", async ({ userID, productID, quantity }) => {
    const response = await axios.put(`http://localhost:3000/api/shop/carts/update`, { userID, productID, quantity })

    return response.data
})


export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            }).addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.cartItems = action.payload.cart
            }).addCase(addToCart.rejected, (state) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true
            }).addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.cartItems = action.payload.cart
            }).addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(deleteCartItems.pending, (state) => {
                state.isLoading = true
            }).addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.cartItems = action.payload.cart
            }).addCase(deleteCartItems.rejected, (state) => {
                state.isLoading = false
                state.cartItems = []
            })
            .addCase(updateCartItems.pending, (state) => {
                state.isLoading = true
            }).addCase(updateCartItems.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.cartItems = action.payload.cart
            }).addCase(updateCartItems.rejected, (state) => {
                state.isLoading = false
                state.cartItems = []
            })
    }

})

export default shoppingCartSlice.reducer

