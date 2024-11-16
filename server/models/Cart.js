import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Need UserID"],
    },

    items: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: [true, "Need ProductID"],
            },
            quantity: {
                type: Number,
                required: [true, "Need Quantity"],
                min: 1
            },
        }
    ]
},
    {
        timestamps: true
    });

const cart = mongoose.model('Cart', CartSchema);
export default cart