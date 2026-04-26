import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
    try {
        const data = localStorage.getItem("wishlist");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const handleToggleWishlist = (state, action) => {
    const productId = action.payload;
    const exists = state.items.includes(productId);
    if (exists) {
        state.items = state.items.filter((id) => id !== productId);
    } else {
        state.items.push(productId);
    }
    localStorage.setItem("wishlist", JSON.stringify(state.items));
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: getInitialWishlist(),
    },
    reducers: {
        toggleWishlist: (state, action) => {
            handleToggleWishlist(state, action);
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem("wishlist");
        }
    }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;