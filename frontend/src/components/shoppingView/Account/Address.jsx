import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { addressFormControls } from '@/components/config'
import CommonForm from '@/components/form'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/store/shop/address.slice'
import AddressCard from './AddressCard'
import { useToast } from "@/hooks/use-toast"

const Address = () => {
  const [currentEditedAddress, setCurrentEditedAddress] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { addressList } = useSelector(state => state.shopAddress)
  const { toast } = useToast()

  const onSubmit = (data) => {
    if (addressList?.addressInfo?.length >= 3 && currentEditedAddress === null) {
      toast({
        variant: "destructive",
        title: "You can add max 3 addresses",
        duration: 2500
      })
      return;
    }

    if (currentEditedAddress === null) {
      dispatch(addNewAddress({
        userID: user?.id,
        formData: data
      })).then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses({ userID: user?.id }))
          toast({
            description: "Address Added Successfully",
            className: "bg-black text-white",
            duration: 2500
          })
        }
      })
    }
    else {
      dispatch(editAddress({
        userID: user?.id,
        addressID: currentEditedAddress._id,
        formData: data
      })).then(data => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses({ userID: user?.id }))
          setCurrentEditedAddress(null)
          toast({
            description: "Address Updated Successfully",
            className: "bg-black text-white",
            duration: 2500,
          });
        }
      })
    }

  }

  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedAddress(getCurrentAddress)
  }

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(deleteAddress({
      userID: user?.id,
      addressID: getCurrentAddress._id
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses({ userID: user?.id }))
        toast({
          variant: "destructive",
          description: "Address Deleted Successfully",
          duration: 2500
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddresses({ userID: user?.id }))
  }, [dispatch])

  return <Card>
    <div className='mb-2 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {
        addressList?.addressInfo && addressList?.addressInfo?.length > 0 ?
          addressList?.addressInfo.map((item, index) => <AddressCard key={index} addressInfo={item} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} />) : <div className='font-bold'>No Address Added. Add Address Below.</div>
      }

    </div>
    <CardHeader>
      <CardTitle>{currentEditedAddress === null ? "Add New Address" : "Edit Address"}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <CommonForm currentEdited={currentEditedAddress} onSubmit={onSubmit} formControls={addressFormControls} buttonText={currentEditedAddress === null ? "Add Address" : "Update Address"} />
    </CardContent>
  </Card>
}

export default Address
