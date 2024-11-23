import address from "../models/Address.js";

const addAddress = async (req, res) => {
    try {
        const { userID, formData } = req.body;
        const { place, city, pincode, phone, notes } = formData;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID not present"
            })
        }

        if (!place || !city || !pincode || !phone) {
            return res.status(400).json({
                success: false,
                message: "All address fields (address, city, pincode, phone) are required"
            });
        }

        let checkUser = await address.findOne({ userID })
        if (!checkUser) {
            checkUser = new address({
                userID: userID,
                addressInfo: []
            })
        }

        checkUser.addressInfo.push({
            place,
            city,
            pincode,
            phone,
            notes: notes || ""
        })

        await checkUser.save();
        return res.status(200).json({
            success: true,
            address: checkUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occured"
        })

    }
}
const fetchAllAddress = async (req, res) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID not present"
            })
        }

        const addressInformation = await address.findOne({ userID })
        if (!addressInformation) {
            const addressInformation = await address.create({
                userID,
                addressInfo: []
            })
            return res.json({
                success: true,
                address: addressInformation
            })
        }
        res.status(200).json({
            success: true,
            address: addressInformation
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })

    }
}
const editAddress = async (req, res) => {
    try {
        const { userID, addressID, formData } = req.body;
        const { place, city, pincode, phone, notes } = formData;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID not present"
            })
        }
        if (!addressID) {
            return res.status(400).json({
                success: false,
                message: "Address ID not present"
            })
        }
        const addressInformation = await address.findOne({ userID })
        if (!addressInformation) {
            return res.status(404).json({
                success: false,
                message: "Address information not found for the user"
            });
        }

        const changeAddress = addressInformation.addressInfo.find(item => item._id.toString() === addressID);
        if (changeAddress) {
            changeAddress.place = place
            changeAddress.city = city
            changeAddress.pincode = pincode
            changeAddress.phone = phone
            changeAddress.notes = notes || ""
        }
        else {
            return res.status(404).json({
                success: false,
                message: "AddressInformation Not found"
            })
        }
        await addressInformation.save()

        res.status(200).json({
            success: true,
            address: addressInformation
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })

    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userID, addressID } = req.params;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User ID not present"
            })
        }
        if (!addressID) {
            return res.status(400).json({
                success: false,
                message: "Address ID not present"
            })
        }
        const addressInformation = await address.findOne({ userID })
        if (!addressInformation) {
            return res.status(404).json({
                success: false,
                message: "Address information not found for the user"
            });
        }
        addressInformation.addressInfo = addressInformation.addressInfo.filter(item => item._id.toString() !== addressID)
        await addressInformation.save();
        res.status(200).json({
            success: true,
            address: addressInformation
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })

    }
}

export default { addAddress, fetchAllAddress, editAddress, deleteAddress }