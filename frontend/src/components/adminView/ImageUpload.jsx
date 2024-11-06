import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, X } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'

const ImageUpload = ({ imageLoadingState, setImageLoadingState, imageFile, setImageFile, uploadedImageURL, setUploadedImageURL }) => {

    const inputRef = useRef(null)

    function handleImageFileChange(event) {
        const selectedFile = event.target.files[0]
        if (selectedFile)
            setImageFile(selectedFile)
        event.target.value = null; //Reset the input value to allow re-selecting the same file
    }

    function handleDragOver(event) {
        event.preventDefault()
    }

    function handleDrop(event) {
        event.preventDefault()
        const droppedFile = event.dataTransfer.files[0]
        if (droppedFile)
            setImageFile(droppedFile)
    }

    function handleRemoveImage() {
        setImageFile(null)
        setUploadedImageURL(null)
    }

    async function uploadToCloudinary() {
        setImageLoadingState(true)
        const data = new FormData();   //While dealing with file uplaods with libraries like axios or fetch
        data.append('my_file', imageFile)
        const response = await axios.post("http://localhost:3000/api/admin/products/imageupload", data)
        if (response.data.success) {
            setUploadedImageURL(response.data.result.url);
            setImageLoadingState(false)
        }
    }

    useEffect(() => {
        if (!imageFile !== null) uploadToCloudinary()
    }, [imageFile])

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop} className='w-full mt-4 max-w-md mx-auto'>
            <Label className="text-lg font-semibold mb-2 block" >Upload Image</Label>
            <div className='border-2 border-dashed rounded-lg '>
                <Input id="image-upload" className="hidden" type="file" ref={inputRef} onChange={handleImageFileChange} />

                {!imageFile ?
                    <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-44 cursor-pointer">
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2 ' />
                        <span>Drag & drop or clock to upload image</span>
                    </Label> : <div className='flex items-center justify-between p-2'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 h-8 text-primary mr-2' />
                        </div>
                        <p className='text-sm font-medium'>{imageFile.name}</p>

                        {/* {imageLoadingState ? <div>Loading...</div> : <img src={uploadedImageURL} alt="" /> } */}


                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                            <X className='w-4 h-4' />
                            <span className='sr-only'>Remove File</span>
                        </Button>

                    </div>}
            </div>
        </div>
    )
}

export default ImageUpload
