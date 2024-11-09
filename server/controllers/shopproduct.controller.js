import product from "../models/Product.js";

const getFilteredProducts = async (req, res) => {
    try {
        const fetchProducts = await product.find({});
        res.status(200).send({
            success: true,
            product: fetchProducts
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

export default {getFilteredProducts}