import cart from "../models/Cart.js";
import product from "../models/Product.js";

const addToCart = async (req, res) => {
    try {
        const { userID, productID, quantity } = req.body;

        if (!userID || !productID || quantity < 0)
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            })

        const Product = await product.findById(productID);
        if (!Product)
            return res.status(400).json({
                success: false,
                message: "No Product Found"
            })

        let checkCart = await cart.findOne({ userID })
        if (!checkCart) {
            checkCart = new cart({
                userID: userID,
                items: []
            });
        }


        const existingProduct = checkCart.items.find(item => item.productID.toString() === productID);
        if (existingProduct) {
            existingProduct.quantity += 1;
        }
        else {
            checkCart.items.push({
                productID,
                quantity
            })
        }

        await checkCart.save();
        return res.status(200).json({
            success: true,
            cart: checkCart
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}



const fetchCartItems = async (req, res) => {
    try {
        const { userID } = req.params;
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "UserID is required"
            })
        }
        const Cart = await cart.findOne({ userID }).populate({
            path: "items.productID",
            select: "image title price salePrice"
        })
        if (!Cart) {
            const Cart = await cart.create({
                userID: userID,
                items: []
            });
            return res.json({
                success: true,
                cart: Cart
            })
        }

        //To discard the item with null productID
        const validItems = Cart.items.filter(productItem => productItem.productID);

        if (validItems.length < Cart.items.length) {
            Cart.items = validItems;
            await Cart.save()
        }

        const populateCartItems = validItems.map(item => ({
            productID: item.productID._id,
            image: item.productID.image,
            title: item.productID.title,
            price: item.productID.price,
            salePrice: item.productID.salePrice,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            cart: {
                ...Cart._doc,
                items: populateCartItems

            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

const updateCartItemQuantity = async (req, res) => {
    try {
        const { userID, productID, quantity } = req.body;
        if (!userID || !productID || quantity < 0)
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            })

        const Cart = await cart.findOne({ userID })
        if (!Cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        const existingProduct = Cart.items.find(item => item.productID.toString() === productID);
        if (existingProduct) {
            existingProduct.quantity = quantity;
        }
        else {
            return res.status(404).json({
                success: false,
                message: "Cart Item Not found"
            })
        }
        await Cart.save();
        await Cart.populate({
            path: "items.productID",
            select: "image title price salePrice"
        })
        const populateCartItems = Cart.items.map(item => ({
            productID: item.productID ? item.productID._id : null,
            image: item.productID ? item.productID.image : null,
            title: item.productID ? item.productID.title : "Product Not Found",
            price: item.productID ? item.productID.price : null,
            salePrice: item.productID ? item.productID.salePrice : null,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            cart: {
                ...Cart._doc,
                items: populateCartItems

            }
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const { userID, productID } = req.params;
        if (!userID || !productID)
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            })

        const Cart = await cart.findOne({ userID })
        if (!Cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found"
            })
        }

        Cart.items = Cart.items.filter(item => item.productID._id.toString() !== productID)
        await Cart.save()
        await Cart.populate({
            path: "items.productID",
            select: "image title price salePrice"
        })

        const populateCartItems = Cart.items.map(item => ({
            productID: item.productID ? item.productID._id : null,
            image: item.productID ? item.productID.image : null,
            title: item.productID ? item.productID.title : "Product Not Found",
            price: item.productID ? item.productID.price : null,
            salePrice: item.productID ? item.productID.salePrice : null,
            quantity: item.quantity
        }))

        res.status(200).json({
            success: true,
            cart: {
                ...Cart._doc,
                items: populateCartItems

            }
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

export default { addToCart, fetchCartItems, updateCartItemQuantity, deleteCartItem }