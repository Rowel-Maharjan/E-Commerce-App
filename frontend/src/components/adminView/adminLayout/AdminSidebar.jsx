import { ChartNoAxesCombined, X } from 'lucide-react'
import React, { Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Boxes, Check, LayoutDashboard, ShoppingCart } from "lucide-react";

const adminSideBar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Boxes />
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Check />
  }
]

function MenuItems({ open, setOpen }) {
  const navigate = useNavigate()
  const location = useLocation();
  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSideBar.map((menuItems) => <div onClick={() => { navigate(menuItems.path); setOpen(!open) }} key={menuItems.id} className={`cursor-pointer flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground hover:text-red-500 ${location.pathname === menuItems.path ? 'text-red-500 bg-muted' : ''}  `}>
        {menuItems.icon}
        <span>{menuItems.label}</span>
      </div>
      )
    }
  </nav>
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate()
  return (
    <Fragment>
      <div>
        <aside className={`fixed top-0 left-0 h-full w-full sm:relative sm:w-64 flex-col border-r bg-background p-6 transition-transform z-50 duration-300 ${open ? 'translate-x-0 ' : '-translate-x-full'
          } sm:translate-x-0 sm:flex`}>
          <div onClick={() => { navigate("/admin/dashboard"); setOpen(!open) }} className='flex justify-between items-center gap-2 cursor-pointer'>
            <div className='flex justify-center items-center gap-2'>
              <ChartNoAxesCombined size={30} />
              <h1 className='text-xl lg:text-xl font-extrabold sm:text-lg'>Admin Panel</h1>
            </div>
            <div className='sm:hidden' onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
              <X />
            </div>
          </div>
          <MenuItems open={open} setOpen={setOpen} />
        </aside>
      </div>
    </Fragment>
  )
}

export default AdminSidebar
