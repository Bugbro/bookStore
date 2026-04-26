import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./features/book/bookSlice.js";
import cartReducer from "./features/cart/cartSlice.js";
import authReducer from "./features/auth/authSlice.js";
import orderReducer from "./features/order/orderSlice.js";
import recommendationReducer from "./features/recommendation/recommendationSlice.js";
import wishlistReducer from "./features/wishlist/wishlistSlice.js";

export const store = configureStore({
    reducer: {
        books: bookReducer,
        cart: cartReducer,
        auth: authReducer,
        order: orderReducer,
        recommendation: recommendationReducer,
        wishlist: wishlistReducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    if (!state.auth.user) {
        localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
    }
});