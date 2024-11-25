import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress }) => {
    return (
        <Card className="flex flex-col ">
            <CardContent className="grid p-4 gap-4 flex-1">
                <Label><span className='font-bold'>Address:</span> {addressInfo?.place}</Label>
                <Label><span className='font-bold'>City:</span> {addressInfo?.city}</Label>
                <Label><span className='font-bold'>Pincode:</span> {addressInfo?.pincode}</Label>
                <Label><span className='font-bold'>Phone:</span> {addressInfo?.phone}</Label>
                <Label><span className='font-bold'>Notes:</span> {addressInfo?.notes}</Label>
            </CardContent>

            <CardFooter className="p-3 flex justify-between">
                <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
                <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard
