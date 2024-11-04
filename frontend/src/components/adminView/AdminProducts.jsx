import React, { Fragment, useState } from 'react'
import { Button } from '../ui/button'
import { addProductFormElements } from '../config';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useForm } from "react-hook-form";
import CommonForm from '../form';

const AdminProducts = () => {
  const [openCreateProduct, setOpenCreateProduct] = useState(false)
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = (data) => {
    reset()
    console.log(data);
  }
  return <Fragment>
    <div className='mb-5 w-full flex justify-end'>
      <Button onClick={() => setOpenCreateProduct(true)} >Add New Product</Button>
    </div>
    <div className='gird gap-4 md:grid-cols-3 lg:grid-cols-4'></div>

    <Sheet open={openCreateProduct} onOpenChange={setOpenCreateProduct} >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
        </SheetHeader>
        <div className='py-4'>
          <CommonForm onSubmit={onSubmit} formControls={addProductFormElements} buttonText={"Add Product"} />
        </div>
      </SheetContent>
    </Sheet>
  </Fragment>
}

export default AdminProducts
