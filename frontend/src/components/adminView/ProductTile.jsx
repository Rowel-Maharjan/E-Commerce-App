import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct, fetchAllProducts } from '@/store/admin/product.slice'
import { toast } from '@/hooks/use-toast'

const ProductTile = ({ product, setCurrentEditedProduct, currentEditedProduct, setOpenCreateProduct }) => {
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteProduct(id)).then(() => {
            dispatch(fetchAllProducts());
        })
        toast({
            variant: "destructive",
            description: "Product Deleted Successfully",
            duration: 2500
        })
    }

    const handleEdit = (product) => {
        setCurrentEditedProduct(product);
        setOpenCreateProduct(true);

    }

    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div>
                <div className='relative'>
                    <img src={product.image} alt={product.title} className='w-full h-[300px] object-cover rounded-t-lg' />
                </div>
                <CardContent className='p-3'>
                    <h2 className='text-xl font-bold mb-2 mt-2'>{product.title}</h2>
                    <div className={`flex ${product.salePrice > 0 ? 'justify-between' : 'justify-end'} items-center mb-2`}>
                        <span className={`text-lg font-semibold text-primary ${product.salePrice > 0 ? 'line-through' : ''}`}>${product.price}</span>
                        {
                            product.salePrice > 0 && <span className='text-lg font-bold'> ${product.salePrice} </span>
                        }

                    </div>
                </CardContent>
                <CardFooter className='flex justify-between items-center p-3' >
                    <Button onClick={() => handleEdit(product)} >Edit</Button>
                    <Button onClick={() => handleDelete(product._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ProductTile
