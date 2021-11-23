import { createSlice } from '@reduxjs/toolkit';

const Products = createSlice({
    name: "Products",
    initialState: {
        data: [{
            category: "Smart Watch",
            name: "Apple Series 5",
            price: 48000,
            id: 3360,
            varients: [{
                type: "Size",
                option: [{
                    name: "XS",
                    price: 50
                }, {
                    name: "S",
                    price: 100
                }]
            }, {
                type: "Band",
                option: [{
                    name: "Band Red",
                    price: 150
                },
                {
                    name: "Band Black",
                    price: 200
                }]
            }]
        }, {
            category: "Smart Watch",
            name: "Samsung Gare S3",
            price: 40000,
            id: 7894,
            varients: [{
                type: "Band",
                option: [{
                    name: "chain",
                    price: 1000
                }, {
                    name: "Black Matt",
                    price: 800
                }]
            }]
        }, {
            category: "Smart Watch",
            name: "Android watch",
            price: 8000,
            id:77889,
            varients: [{
                type: "Shape",
                option: [{
                    name: "Round",
                    price: 1500
                }]
            }]
        }, {
            category: "Cosmetics",
            name: "Coconut Oil",
            price: 300,
            id:8213,
            varients: [{
                type: "Size",
                option: [{
                    name: "200ml",
                    price: 150
                }, {
                    name: "300ml",
                    price: 300
                }]
            }]
        }, {
            category: "Cosmetics",
            name: "Shampoo",
            price: 350,
            id:3578,
            varients: [{
                type: "Size",
                option: [{
                    name: "500ml",
                    price: 200
                }, {
                    name: "750ml",
                    price: 300,
                }]
            }]
        }, {
            category: "Cosmetics",
            name: "Sun Block",
            price: 450,
            id:4567,
            varients: [{
                type: "Size",
                option: [{
                    name: "100ml",
                    price: 200
                }, {
                    name: "200ml",
                    price: 400
                }]
            }]
        }, {
            category: "Mobile Accessories",
            name: "Power Bank",
            price: 1000,
            id:99456,
            varients: [{
                type: "mAh",
                option: [{
                    name: "10000mAh",
                    price: 500
                }, {
                    name: "150000mAh",
                    price: 800
                }]
            }]
        }, {
            category: "Mobile Accessories",
            name: "Wireless Charger",
            price: 1500,
            id:55587,
            varients: [{
                type: "Colour",
                option: [{
                    name: "Black",
                    price: 200
                }, {
                    name: "Pink",
                    price: 150
                }]
            }]
        }, {
            category: "Mobile Accessories",
            name: "Magnit Cable",
            price: 800,
            id:997403,
            varients: [{
                type: "Port",
                option: [{
                    name: "IOS",
                    price: 0
                }, {
                    name: "Android",
                    price: 0
                }, {
                    name: "Type C",
                    price: 0
                }]
            }]
        }, {
            category: "Mobile Accessories",
            name: "UV Glass",
            price: 350,
            id:332145,
            varients: [{
                type: "Model",
                option: [{
                    name: "S8",
                    price: 0
                }, {
                    name: "S8+",
                    price: 0
                }, {
                    name: "S8+",
                    price: 0
                }, {
                    name: "S9",
                    price: 0
                }, {
                    name: "S9+",
                    price: 0
                }]
            }]
        }],
        categories: 'All Category'
    },
        
    reducers: {
        productAdd: (state, action) => {
            state.data.push(action.payload)
        },
        selectedCategory:(state, action) => {
            state.categories = action.payload
        }
    }
})

export const { productAdd, selectedCategory } = Products.actions
export default Products