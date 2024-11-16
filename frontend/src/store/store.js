import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import productReducer from './admin/product.slice'
import shoppingProductReducer from "./shop/shop.slice"
import shoppingCartReducer from './shop/cart.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: productReducer,
    shopProducts: shoppingProductReducer,
    shopCart: shoppingCartReducer,
  },
})