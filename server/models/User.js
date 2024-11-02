import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter Username"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Email"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }

},
    {
        timestamps: true
    });

const user = mongoose.model('User', UserSchema);
export default user