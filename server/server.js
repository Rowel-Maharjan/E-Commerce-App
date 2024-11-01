import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import cors from "cors";

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(cookieParser())
app.use(express.json())

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
    res.send('Hello World!')
})



