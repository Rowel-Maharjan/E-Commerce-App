import express from "express"
import cartController from "../controllers/cart.controller.js"

const { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem } = cartController

const cartrouter = express.Router();

cartrouter.post("/add", addToCart)
cartrouter.get("/get/:userID", fetchCartItems)
cartrouter.put("/update", updateCartItemQuantity)
cartrouter.delete("/delete/:userID/:productID", deleteCartItem)

export default cartrouter

