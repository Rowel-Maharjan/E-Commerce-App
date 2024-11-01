import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      <AdminSidebar />
      <div className='flex flex-grow flex-col '>
        <AdminHeader />
        <main className='flex-grow flex bg-gray-200 p-4 md:p-6 text-black'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
