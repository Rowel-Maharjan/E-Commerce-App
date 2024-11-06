import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please Enter Image"],
    },
    title: {
        type: String,
        required: [true, "Please Enter Title"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"],
    },

    category: {
        type: String,
        required: [true, "Please Enter Category"],
    },
    brand: {
        type: String,
        required: [true, "Please Enter Brand"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Price"],
    },
    salePrice: {
        type: Number,
        required: [true, "Please Enter Sale Price"],
    },
    totalStock: {
        type: Number,
        required: [true, "Please Enter Total Stock"],
    },

},
    {
        timestamps: true
    });

const product = mongoose.model('Product', ProductSchema);
export default product