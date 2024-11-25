import React from 'react'
import { DialogTitle, DialogContent, DialogDescription } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../form'

const OrderDetails = ({ setopenDetailsDialog }) => {

    const onSubmit = (data) => {
        setopenDetailsDialog(false)
        console.log(data.status)
    }

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
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "rejected", label: "Rejected" },
                                    { id: "deliverd", label: "Delivered" },
                                ],
                            }
                        ]}
                        onSubmit={onSubmit}
                        buttonText="Update Order Status"
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default OrderDetails
