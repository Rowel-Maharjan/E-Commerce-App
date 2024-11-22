import { shoppingViewHeaderMenuItems } from '@/components/config'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '@/store/auth-slice'
import CartWrapper from '../CartWrapper'
import { fetchCartItems } from '@/store/shop/cart.slice'
import { Label } from '@/components/ui/label'

function MenuItems({ setOpenMenu }) {
  const navigate = useNavigate()
  const handleListingPage = (currentItem) => {
    if (currentItem.id === "home") {
      navigate("/shop/home");
    } else {
      sessionStorage.removeItem("filter");
      sessionStorage.setItem("filter", JSON.stringify({ category: [currentItem.id], brand: [] }));
      navigate("/shop/listing")
    }
    setOpenMenu(false);
  }

  return <nav className='flex flex-col mb-3 md:mb-0 md:items-center gap-6 md:gap-6 sm:gap-6 md:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItems =>
        <Label onClick={() => { handleListingPage(menuItems); }} key={menuItems.id} className='text-sm font-medium cursor-pointer'>{menuItems.label}</Label>
      )
    }
  </nav>
}

function HeaderRightContent() {

  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shopCart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openCartSheet, setOpenCartSheet] = useState(false)

  useEffect(() => {
    dispatch(fetchCartItems(user.id))
  }, [dispatch])


  return <div className='flex flex-col md:items-center md:flex-row  gap-4'>
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button onClick={() => { dispatch(fetchCartItems(user.id)); setOpenCartSheet(true) }} variant="outline" size="icon">
        <ShoppingCart className='w-6 h-6' />
        <span className='sr-only'>User Cart</span>
      </Button>
      <CartWrapper cartItems={cartItems} />
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='bg-black cursor-pointer'>
          <AvatarFallback className="bg-black font-bold text-white">{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 bg-[#09090b] text-white'>
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserCog className='mr-2 h-4 w-4' />
          <span> My Account</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => dispatch(logoutUser())}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Logout</span>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}


const ShoppingHeader = () => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <div className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to="/shop/home" className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className='font-bold'>Ecommerce</span>
        </Link>

        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs ">
            <Link onClick={() => setOpenMenu(false)} to="/shop/home" className='flex items-center gap-2 mb-5'>
              <HousePlug className='h-6 w-6' />
              <span className='font-bold'>Ecommerce</span>
            </Link>
            <MenuItems setOpenMenu={setOpenMenu} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className='hidden md:block'>
          <MenuItems setOpenMenu={setOpenMenu} />
        </div>
        <div className='hidden md:block'>
          <HeaderRightContent />
        </div>
      </div>
    </div>
  )
}

export default ShoppingHeader
