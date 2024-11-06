import express from "express"
import adminproductController from "../controllers/adminproduct.controller.js";
import multer from "multer"


// Multer as a middleware is often used before Cloudinary to prepare and handle file uploads in a Node.js/Express environment. 
const storage = new multer.memoryStorage()
const upload = multer({ storage: storage })

const { imageupload, addProduct, fetchAllProducts, editProduct, deleteProduct } = adminproductController;

const adminproductroter = express.Router()

adminproductroter.post("/imageupload", upload.single('my_file'), imageupload);
adminproductroter.post("/addproduct", addProduct);
adminproductroter.get("/fetchallproduct", fetchAllProducts);
adminproductroter.put("/editproduct/:id", editProduct);
adminproductroter.delete("/deleteproduct/:id", deleteProduct);

export default adminproductroter