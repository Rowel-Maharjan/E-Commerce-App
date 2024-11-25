import React, { useEffect, useState } from 'react'
import img from "../../assets/account.jpg"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAddresses } from '@/store/shop/address.slice'
import Address from './Account/Address'
import CartItemsContent from './CartItemsContent'
import { Button } from '../ui/button'

const Checkout = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.shopCart)

  useEffect(() => {
    dispatch(fetchAllAddresses({ userID: user?.id }))
  }, [dispatch])

  const totalCartAmount = cartItems.items && cartItems.items?.length > 0 ?
    cartItems.items.reduce((acc, value) => {
      return acc + ((value.salePrice > 0 ? value.salePrice : value.price) * value.quantity)
    }, 0)
    : 0


  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} alt="Not Found" className='h-full w-full object-cover object-center' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 p-5'>
        <Address />
        <div className='flex flex-col gap-4'>
          {
            cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => <CartItemsContent cartItems={item} key={item.productID} />) : null
          }
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='font-bold'>Total</span>
              <span className='font-bold'>Rs.{totalCartAmount}</span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button className="w-full">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Checkout
