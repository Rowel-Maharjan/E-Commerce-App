import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='flex min-h-screen text-white'>
            <div className='hidden lg:flex items-center justify-center bg-black w-1/2 px-12'>
                <div className='space-y-6 text-center '>
                    <h1 className='text-4xl font-extrabold'>Welcome to Spark Online Shopping</h1>
                </div>
            </div>
            <div className='flex flex-grow items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
                <Outlet />
            </div>
        </div>
    )
}
export default AuthLayout
