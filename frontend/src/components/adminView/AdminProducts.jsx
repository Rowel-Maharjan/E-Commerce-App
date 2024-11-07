import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { addProductFormElements } from '../config';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import CommonForm from '../form';
import ImageUpload from './ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, addNewProduct } from '@/store/admin/product.slice';
import { useToast } from "@/hooks/use-toast"
import ProductTile from './ProductTile';

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageURL, setUploadedImageURL] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const dispatch = useDispatch()
  const { productList } = useSelector((state) => state.adminProducts)
  const { toast } = useToast()


  const onSubmit = (data) => {
    data.image = uploadedImageURL;
    dispatch(addNewProduct(data)).then(data => {
      if (data.payload.success) {
        dispatch(fetchAllProducts())
        setImageFile(null);
        setOpenCreateProduct(false);
        toast({
          description: "Product Added Successfully",
          className: "bg-black text-white",
          duration: 2500
        })
      }
    })
  }

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
            <ProductTile key={product._id} product={product} />
          )) : null
      }

    </div>

    <Sheet open={openCreateProduct} onOpenChange={setOpenCreateProduct} >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
        </SheetHeader>

        <ImageUpload imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageURL={uploadedImageURL} setUploadedImageURL={setUploadedImageURL} />
        <div className='py-4'>
          <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} buttonText={"Add Product"} />
        </div>

      </SheetContent>
    </Sheet>
  </Fragment>
}

export default AdminProducts
