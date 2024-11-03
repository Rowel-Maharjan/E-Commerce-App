import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import cors from "cors";
import authrouter from "./routes/auth.route.js";

const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true, // Allow credentials to be sent
  };
  

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authrouter)


mongoose.connect("mongodb://localhost:27017/E-Commerce")
    // mongoose.connect(process.env.MONGO_URI)  
    .then(() => {
        console.log("Connection Successful")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }).catch((error) => {
        console.log(error)
        console.log("Connection Failed")
    })

app.get('/', async (req, res) => {
    res.send("Hello World")
    
})
