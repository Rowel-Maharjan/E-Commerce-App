import { Button } from '@/components/ui/button'
import axios from 'axios'
import { LogOut, Menu } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({ open, setOpen }) => {
  const navigate = useNavigate()
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={() => setOpen(!open)} className={`${open ? 'hidden' : ''}  sm:hidden`}>
        <Menu size={32} strokeWidth={1.5} />
        <span className='sr-only'>Toggle Menu </span>
      </Button>
      <div className='flex-1 flex justify-end'>
        <Button className=" inline-flex gap-2 items-center rounded-md  px-4 py-2 text-sm font-medium">
          <LogOut /> Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
