import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const ProductTile = ({ product }) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
    return (
        <Card className="w-full max-w-sm mx-auto" >
            <div>
                <div className='relative'>
                    <img src={product.image} alt="product.title" className='w-full h-[300px] object-cover rounded-t-lg' />
                    {
                        product.salePrice > 0 && <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600" >Sale</Badge>
                    }
                </div>

                <CardContent className='p-4'>
                    <h2 className='text-xl font-bold mb-2'>{capitalizeFirstLetter(product.title)}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground'>{capitalizeFirstLetter(product.category)}</span>
                        <span className='text-sm text-muted-foreground'>{capitalizeFirstLetter(product.brand)}</span>
                    </div>
                    <div className={`flex ${product.salePrice > 0 ? 'justify-between' : 'justify-end'} items-center mb-2`}>
                        <span className={`${product.salePrice > 0 ? 'line-through' : ''} text-2xl font-semibold text-primary`}>${product.price}</span>
                        {
                            product.salePrice > 0 && <span className='text-2xl font-semibold text-primary'>${product.salePrice}</span>
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className='w-full'>Add to Cart</Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ProductTile
