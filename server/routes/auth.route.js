import express from "express"
import authController from "../controllers/auth.controller.js";

const { loginUser, registerUser, logoutUser, authMiddleware } = authController;

const authrouter = express.Router();

authrouter.post("/register", registerUser)
authrouter.post("/login", loginUser)
authrouter.post("/logout", logoutUser)

//To send getrequest to obtain the status of user when page is refreshed
authrouter.get("/checkauth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).send({
        success: true,
        message: "Authenticated User",
        user
    })
})

export default authrouter