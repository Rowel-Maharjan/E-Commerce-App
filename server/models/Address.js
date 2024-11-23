import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Enter Username"],
    },
    addressInfo: [{
        place: {
            type: String,
            required: [true, "Please Enter Address"],
        },
        city: {
            type: String,
            required: [true, "Please Enter City"],
        },
        pincode: {
            type: String,
            required: [true, "Please Enter pincode"]
        },
        phone: {
            type: String,
            required: [true, "Please Enter phone"]
        },
        notes: {
            type: String,
        },
    }]

},
    {
        timestamps: true
    })

const address = mongoose.model("Address", AddressSchema)
export default address;

