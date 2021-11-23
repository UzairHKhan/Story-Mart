import { combineReducers } from '@reduxjs/toolkit';
import Products from './state';
import CartProducts from './stateCart';

const reducer = combineReducers({
    Products: Products.reducer,
    CartProducts: CartProducts.reducer
})

export default reducer