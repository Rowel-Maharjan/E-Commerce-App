import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
    cloud_name: 'dbbxxltme',
    api_key: '426567326728571',
    api_secret: 'L9mefOynQFF_ySY7Ciq7ncpQfH8'
});



// Upload an image
async function uploadImageToCloudinary(file) {
    const response = await cloudinary.uploader
        .upload(
            file, {
            resource_type: 'auto',
        }
        )
        .catch((error) => {
            console.log(error);
        });
    return response
}


export default { uploadImageToCloudinary }

