import cloudinary from "../helper/cloudinary.js"

const { uploadImageToCloudinary } = cloudinary


const imageupload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64")  //Multer provide file as a buffer
        const url = "data:" + req.file.mimetype + ";base64," + b64   //Format of url to send to cloudinary
        const result = await uploadImageToCloudinary(url)

        res.json({
            success: true,
            result,
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error Occured"
        })

    }

}

export default { imageupload }