import express from "express"
import shopproductController from "../controllers/shopproduct.controller.js"

const {getFilteredProducts} = shopproductController;

const shopproductrouter = express.Router()

shopproductrouter.get("/fetchallproduct",getFilteredProducts)

export default shopproductrouter