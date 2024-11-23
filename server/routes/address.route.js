import express from "express"
import addressController from "../controllers/address.controller.js";

const { addAddress, fetchAllAddress, editAddress, deleteAddress } = addressController

const addressrouter = express.Router()

addressrouter.post("/add", addAddress)
addressrouter.get("/fetch/:userID", fetchAllAddress)
addressrouter.put("/edit", editAddress)
addressrouter.delete("/delete/:userID/:addressID", deleteAddress)

export default addressrouter;