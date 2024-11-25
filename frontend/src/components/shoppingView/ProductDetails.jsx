import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch } from 'react-redux'
import { setProductDetails } from '@/store/shop/shop.slice'

const ProductDetails = ({ open, setOpen, productDetails, handleAddToCart }) => {
    const dispatch = useDispatch()
 
    const handleChange = ()=>{
        setOpen(false)
        dispatch(setProductDetails())
    }

    return (
        <Dialog open={open} onOpenChange={handleChange}>
            <DialogContent className='grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]'>
                <div className='relative overflow-hidden rounded-lg'>
                    <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover' />
                </div>

                <div>
                    <div>
                        <DialogTitle className='text-3xl font-extrabold'>{productDetails?.title}</DialogTitle>
                        <DialogDescription className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</DialogDescription>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>Rs.{productDetails?.price}</p>
                        {
                            productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>Rs.{productDetails.salePrice}</p> : null
                        }
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-0.5 mt-2'>
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <span className='text-muted-foreground'>(4.5)</span>
                        </div>

                    </div>
                    <div className='mt-5 mb-5'>
                        <Button onClick={() => handleAddToCart(productDetails?._id)} className='w-full'>Add to Cart</Button>
                    </div>
                    <Separator />
                    <div className='max-h-[300px] overflow-auto'>
                        <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                        <div className='grid gap-6'>
                            <div className='flex gap-4'>
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>RM</AvatarFallback>
                                </Avatar>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Rowel Maharjan</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground'>This is an awesome product</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 flex gap-2'>
                            <Input placeholder="Write a review..." />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default ProductDetails
