import user from "../models/User.js"
import bycrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async(req,res) =>{
    const {username, email, password} = req.body
    const saltRounds = 12
    try {
        const hashPassword = await bycrypt.hash(password, saltRounds);
        await user.create({username, email, password: hashPassword});
        res.status(200).send({message: "Registration Successful"})
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}
const loginUser = async(req,res) =>{
    try {
        
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    
}


export default {registerUser, loginUser}