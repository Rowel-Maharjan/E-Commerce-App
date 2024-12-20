export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
];



export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
            { id: "electronics", label: "Electronics" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "goldstar", label: "Goldstar" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
            { id: "apple", label: "Apple" },
            { id: "samsung", label: "Samsung" },
            { id: "oneplus", label: "OnePlus" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: "Home",
        path: "/shop/home"
    },
    {
        id: 'men',
        label: "Men",
        path: "/shop/listing"
    },
    {
        id: 'women',
        label: "Women",
        path: "/shop/listing"
    },
    {
        id: 'kids',
        label: "Kids",
        path: "/shop/listing"
    },
    {
        id: 'accessories',
        label: "Accessories",
        path: "/shop/listing"
    },
    {
        id: 'footwear',
        label: "Footwear",
        path: "/shop/listing"
    },
    {
        id: 'electronics',
        label: "Electronics",
        path: "/shop/listing"
    },
]


export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
        { id: "electronics", label: "Electronics" },
    ],

    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "goldstar", label: "Goldstar" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
        { id: "apple", label: "Apple" },
        { id: "samsung", label: "Samsung" },
        { id: "oneplus", label: "OnePlus" },
    ]
}

export const sortOptions = [
    { id: "lowtohigh", label: "Low to High" },
    { id: "hightolow", label: "High to Low" },
    { id: "atoz", label: "A to Z" },
    { id: "ztoa", label: "Z to A" },
]

export const addressFormControls = [
    {
        label: "Address",
        name: "place",
        componentType: "input",
        type: "text",
        placeholder: "Enter your address"
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city"
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode"
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your phone number"
    },
    {
        label: "Notes",
        name: "notes",
        componentType: "textarea",
        placeholder: "Enter any additional notes"
    },
]