import express from "express"
import shopproductController from "../controllers/shopproduct.controller.js"

const { getFilteredProducts, getFilteredProductDetails } = shopproductController;

const shopproductrouter = express.Router()

shopproductrouter.get("/fetchallproduct", getFilteredProducts)
shopproductrouter.get("/fetchallproduct/:id", getFilteredProductDetails)

export default shopproductrouter