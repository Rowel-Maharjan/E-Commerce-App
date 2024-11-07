import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

const ProductTile = ({ product }) => {
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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ProductTile
