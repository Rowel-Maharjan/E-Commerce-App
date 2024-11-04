import user from "../models/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const saltRounds = 12
    try {
        const checkUser = await user.findOne({ email })
        if (checkUser) {
            return res.status(200).send({ success: false, message: "User Already Exist" })
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await user.create({ username, email, password: hashPassword });
        return res.status(200).send({ success: true, message: "Registration Successful" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// Login User 
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const User = await user.findOne({ email })
        if (!User) {
            return res.status(200).send({ success: false, message: "User Not Found" })
        }
        const MatchPassword = await bcrypt.compare(password, User.password)
        if (!MatchPassword) {
            return res.status(200).send({ success: true, message: "User Exists but incorrect Password", password: false })
        }

        //jwt.sign() - Generates a new JWt
        const token = jwt.sign({ id: User._id, email: User.email, role: User.role }, 'CLIENT_SECRET_KEY', { expiresIn: "60m" })

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Login Successful",
            password: true,
            user: {
                email: User.email,
                role: User.role,
                id: User._id
            }
        });


    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Logout User 
const logoutUser = (req, res) => {
    res.clearCookie("token").send({
        success: true,
        message: "Logged out successfully"
    })
}


// Auth MiddleWare - To make user authenticate even though page is refreshed
const authMiddleware = async (req, res, next) => {
    const token =  req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Unauthorized User",
        })

    }
}




export default { registerUser, loginUser, logoutUser, authMiddleware }