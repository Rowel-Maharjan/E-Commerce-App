import express from "express"
import authController from "../controllers/auth.controller.js";

const {loginUser, registerUser} = authController;

const authrouter = express.Router();

authrouter.post("/register", registerUser)
authrouter.post("/login", loginUser)

export default authrouter