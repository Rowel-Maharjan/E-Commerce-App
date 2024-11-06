import express from "express"
import adminproductController from "../controllers/adminproduct.controller.js";
import multer from "multer"


// Multer as a middleware is often used before Cloudinary to prepare and handle file uploads in a Node.js/Express environment. 
const storage = new multer.memoryStorage()
const upload = multer({ storage: storage })

const { imageupload } = adminproductController;

const adminproductroter = express.Router()

adminproductroter.post("/imageupload", upload.single('my_file'), imageupload);

export default adminproductroter