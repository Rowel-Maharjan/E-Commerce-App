import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartItems, deleteCartItems } from '@/store/shop/cart.slice'
import { useToast } from "@/hooks/use-toast"

const CartItemsContent = ({ cartItems }) => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleMinus = (cartItems) => {
        dispatch(updateCartItems({ userID: user.id, productID: cartItems.productID, quantity: cartItems.quantity - 1 }))
    }

    const handlePlus = (cartItems) => {
        dispatch(updateCartItems({ userID: user.id, productID: cartItems.productID, quantity: cartItems.quantity + 1 }))
    }

    const handleDelete = (cartItems) => {
        dispatch(deleteCartItems({ userID: user?.id, productID: cartItems?.productID }))
        toast({
            description: "Product Removed from Cart!",
            className: "bg-black text-white",
            duration: 2500
        })
    }

    return (
        <div className='flex items-center space-x-4'>
            <img src={cartItems?.image} alt={cartItems?.title} className='w-20 h-20 rounded object-cover' />
            <div className='flex-1'>
                <h3 className='font-extrabold'>{cartItems?.title}</h3>
                <div className='flex gap-3 items-center mt-1'>
                    <Button onClick={() => handleMinus(cartItems)} disabled={cartItems.quantity == 1} variant="outline" size="icon" className="w-8 h-8 rounded-full">
                        <Minus className='w-4 h-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    <span className='font-semibold'>{cartItems?.quantity}</span>
                    <Button onClick={() => handlePlus(cartItems)} variant="outline" size="icon" className="w-8 h-8 rounded-full">
                        <Plus className='w-4 h-4' />
                        <span className='sr-only'>Decrease</span>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <Trash onClick={() => handleDelete(cartItems)} className='cursor-pointer mb-1' size={20} />
                <p className='font-semibold'>
                    Rs.{((cartItems?.salePrice > 0 ? cartItems.salePrice : cartItems?.price) * cartItems?.quantity).toFixed(2)}
                </p>
            </div>
        </div>
    )
}

export default CartItemsContent
