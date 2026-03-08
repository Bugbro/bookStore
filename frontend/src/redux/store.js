import { configureStore  } from "@reduxjs/toolkit";
import bookReducer from "./features/bookSlice.js";
import cartReducer from "./features/cart/cartSlice.js"

export const store = configureStore({
    reducer:{
        books: bookReducer,
        cart: cartReducer 
    }
});