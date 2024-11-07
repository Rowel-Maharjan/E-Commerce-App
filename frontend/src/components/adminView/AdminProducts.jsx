import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { addProductFormElements } from '../config';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import CommonForm from '../form';
import ImageUpload from './ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, addNewProduct, editProduct } from '@/store/admin/product.slice';
import { useToast } from "@/hooks/use-toast"
import ProductTile from './ProductTile';


const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageURL, setUploadedImageURL] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.adminProducts)
  const [currentEditedProduct, setCurrentEditedProduct] = useState(null)
  const { toast } = useToast()



  const onSubmit = (data) => {
    data.image = uploadedImageURL

    //To add New Product
    if (currentEditedProduct === null) {
      dispatch(addNewProduct(data)).then(data => {
        try {
          if (data.payload.success) {
            dispatch(fetchAllProducts())
            setImageFile(null);
            setUploadedImageURL(null)
            setOpenCreateProduct(false);
            toast({
              description: "Product Added Successfully",
              className: "bg-black text-white",
              duration: 2500
            })
          }

        } catch (error) {
          toast({
            variant: "destructive",
            description: "Failed!!! Upload Image to Add Product",
            duration: 3000
          })
        }
      })
    }

    //To update edited product
    else {
      dispatch(editProduct({ id: currentEditedProduct._id, productData: data })).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllProducts());
          setImageFile(null);
          setUploadedImageURL(null)
          setOpenCreateProduct(false);
          setCurrentEditedProduct(null)
          toast({
            description: "Product Updated Successfully", // Changed message for clarity
            className: "bg-black text-white",
            duration: 2500,
          });
        }
      });
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])


  return <Fragment>
    <div className='mb-5 w-full flex justify-end'>
      <Button onClick={() => setOpenCreateProduct(true)} >Add New Product</Button>
    </div>


    <div className='grid gap-3 md:grid-cols-3 lg:grid-cols-4'>
      {
        productList && productList.length > 0 ?
          productList.map(product => (
            <ProductTile setOpenCreateProduct={setOpenCreateProduct} setCurrentEditedProduct={setCurrentEditedProduct} currentEditedProduct={currentEditedProduct} key={product._id} product={product} setUploadedImageURL={setUploadedImageURL} />
          )) : <div>No Products to show</div>
      }

    </div>

    <Sheet open={openCreateProduct} onOpenChange={() => {
      setOpenCreateProduct(false)    //Another way to do it
      setUploadedImageURL(null)
      setCurrentEditedProduct(null)

    }} >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle className='text-2xl'>
            {currentEditedProduct === null ? "Add New Product" : "Edit Product"}
          </SheetTitle>
        </SheetHeader>

        <ImageUpload imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageURL={uploadedImageURL} setUploadedImageURL={setUploadedImageURL} />
        <div className='py-4'>
          <CommonForm onSubmit={onSubmit} uploadedImageURL={uploadedImageURL} formControls={addProductFormElements} buttonText={currentEditedProduct === null ? "Add Product" : "Update Product"} currentEditedProduct={currentEditedProduct} />
        </div>
      </SheetContent>
    </Sheet>
  </Fragment>
}

export default AdminProducts
