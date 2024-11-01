import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'

const app = express()
const port = 3000

mongoose.connect("mongodb://localhost:27017/E-Commerce")
// mongoose.connect(process.env.MONGO_URI)  
    .then(() => {
        console.log("Connection Successful")
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }).catch(()=>{
        console.log("Connection Failed")
    })

app.get('/', async(req, res) => {
    res.send('Hello World!')    
})



