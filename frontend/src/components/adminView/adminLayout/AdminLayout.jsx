import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {

  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <div className='flex min-h-screen w-full'>
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className='flex flex-grow flex-col '>
        <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />
        <main className='flex-grow flex bg-gray-200 p-4 md:p-6 text-black'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
