import user from "../models/User.js"
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const saltRounds = 12
    try {
        const checkUser = await user.findOne({ email })
        if (checkUser) {
            return res.status(200).send({ success: false, message: "User Already Exist" })
        }
        const hashPassword = await bycrypt.hash(password, saltRounds);
        const newUser = await user.create({ username, email, password: hashPassword });
        return res.status(200).send({ success: true, message: "Registration Successful" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.findOne({ email })
        if (!User) {
            return res.status(200).send({ success: false, message: "User Not Found" })
        }
        const MatchPassword = await bycrypt.compare(password, User.password)
        if (!MatchPassword) {
            return res.status(200).send({ success: true, message: "User Exists but incorrect Password", password: false })
        }

        //jwt.sign() - Generates a new JWt
        const token = jwt.sign({ id: User._id, email: User.email, role: User.role }, 'CLIENT_SECRET_KEY', { expiresIn: "1h" })

        res.cookie("token", token, {httpOnly : true, secure: false}).json({
            success: true,
            message: "Login Successful",
            password: true,
            user: {
                username: User.username,
                email: User.email,
                role: User.role,
                id: User._id
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export default { registerUser, loginUser }