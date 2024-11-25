import { DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const OrderDetails = () => {
    return (
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <DialogTitle className='sr-only'>Order Detials</DialogTitle>
            <DialogDescription className='sr-only'>Detials</DialogDescription>
            <div className='grid gap-6'>
                <div className='grid gap-2'>
                    <div className='flex mt-6 items-center justify-between'>
                        <p className='font-medium'>Order ID</p>
                        <Label>123456</Label>

                    </div>
                    <div className='flex mt-1 items-center justify-between'>
                        <p className='font-medium'>Order Date</p>
                        <Label>27/45/2002</Label>
                    </div>
                    <div className='flex mt-1 items-center justify-between'>
                        <p className='font-medium'>Order Price</p>
                        <Label>Rs.2000</Label>
                    </div>
                    <div className='flex mt-1 items-center justify-between'>
                        <p className='font-medium'>Order Status</p>
                        <Label>In Process</Label>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>
                            Order Details
                        </div>
                        <ul className='grid gap-3'>
                            <li className='flex items-center justify-between'>
                                <span>Product One</span>
                                <span>Rs.100</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-2'>
                    <div className='font-medium'>
                        Shipping Info
                    </div>
                    <div className='grid gap-0.5 text-muted-foreground'>
                        <span>Username</span>
                        <span>Address</span>
                        <span>City</span>
                        <span>Pincode</span>
                        <span>Phone</span>
                        <span>Notes</span>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetails