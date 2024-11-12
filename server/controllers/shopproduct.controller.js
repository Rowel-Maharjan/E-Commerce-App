import product from "../models/Product.js";

const getFilteredProducts = async (req, res) => {
    try {
        const { category, brand, sortBy } = req.query
        const filter = {};
        const sort = {};
        if (category)
            filter.category = { $in: category.split(",") }
        if (brand)
            filter.brand = { $in: brand.split(",") }

        switch (sortBy) {
            case "lowtohigh":
                sort.price = 1
                break;
            case "hightolow":
                sort.price = -1
                break;
            case "atoz":
                sort.title = 1
                break;
            case "ztoa":
                sort.title = -1
                break;

            default:
                sort.price = 1
                break;
        }
        const fetchProducts = await product.find(filter).sort(sort);
        res.status(200).send({
            success: true,
            product: fetchProducts
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Error Occured"
        })
    }
}

export default { getFilteredProducts }