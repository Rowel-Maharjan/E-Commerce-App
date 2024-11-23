import cloudinary from "../helper/cloudinary.js"
const { uploadImageToCloudinary } = cloudinary
import product from "../models/Product.js"

//Upload Immage to Cloudinary
const imageupload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const b64 = Buffer.from(req.file.buffer).toString("base64")  //Multer provide file as a buffer
        const url = "data:" + req.file.mimetype + ";base64," + b64   //Format of url to send to cloudinary
        const result = await uploadImageToCloudinary(url)
        res.json({
            success: true,
            result,
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error Occured"
        })

    }
}

//Add a New Product
const addProduct = async (req, res) => {
    try {
        const newProduct = await product.create(req.body);
        return res.status(200).send({
            success: true,
            product: newProduct
        })
    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}
//Fetch all the product
const fetchAllProducts = async (req, res) => {
    try {
        const fetchProducts = await product.find({});
        return res.status(200).send({
            success: true,
            product: fetchProducts
        })
    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}



//Edit a Product
const editProduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndUpdate(req.params.id, req.body);
        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        return res.status(200).send({
            success: true,
            product: Product
        })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Delete a product
const deleteProduct = async (req, res) => {
    try {
        const Product = await product.findByIdAndDelete(req.params.id);
        if (!Product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export default { imageupload, addProduct, fetchAllProducts, editProduct, deleteProduct }