import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemsContent from './CartItemsContent'

const CartWrapper = ({ cartItems }) => {

  const totalCartAmount = cartItems.items && cartItems.items?.length > 0 ?
    cartItems.items.reduce((acc, value) => {
      return acc + ((value.salePrice > 0 ? value.salePrice : value.price) * value.quantity)
    }, 0)
    : 0

  return <SheetContent className="sm:max-w-md">
    <SheetHeader>
      <SheetTitle className='font-bold text-2xl'>Your Cart</SheetTitle>
    </SheetHeader>


    <div className='mt-8 space-y-4'>
      {
        cartItems.items && cartItems.items.length > 0 ?
          cartItems.items.map(item => <CartItemsContent key={item.productID} cartItems={item} />) : null
      }
    </div>
    <div className='mt-8 space-y-4'>
      <div className='flex justify-between'>
        <span className='font-bold'>Total</span>
        <span className='font-bold'>${totalCartAmount}</span>
      </div>
    </div>

    <Button className="w-full mt-6">Checkout</Button>
  </SheetContent>
}

export default CartWrapper
