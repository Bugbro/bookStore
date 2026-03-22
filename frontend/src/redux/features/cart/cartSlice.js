import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartAPI, updateCartAPI, getCartAPI } from "../../../api/cartAPI/cartAPI.js";
import { logoutUser } from "../auth/authSlice.js";

const savedCart = localStorage.getItem("cart");
const initialState = {
    cartItems: savedCart ? JSON.parse(savedCart) : []
};

// Async Thunks for backend sync
export const fetchUserCart = createAsyncThunk(
    "cart/fetchUserCart",
    async (_, thunkAPI) => {
        try {
            const res = await getCartAPI();
            // Map the backend items to the frontend structure. Handle both res.data.data and res.data.cart in case.
            const cartData = res.data.data || res.data.cart;
            const frontendItems = (cartData?.items || [])
                .filter(item => item.bookId) // Filter out items where the book might have been deleted
                .map(item => ({
                _id: item.bookId._id,
                title: item.bookId.title,
                price: item.price,
                image: item.bookId.images?.[0] || "",
                quantity: item.quantity
            }));
            return frontendItems;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);

export const addToCartThunk = createAsyncThunk(
    "cart/addToCartThunk",
    async (item, { getState, dispatch }) => {
        const { auth } = getState();
        if (auth.user) {
            await addToCartAPI({ bookId: item._id, quantity: item.quantity });
        }
        dispatch(addToCart(item));
    }
);

export const increaseQtyThunk = createAsyncThunk(
    "cart/increaseQtyThunk",
    async (id, { getState, dispatch }) => {
        const { auth, cart } = getState();
        const item = cart.cartItems.find(i => i._id === id);
        if (auth.user && item) {
            await updateCartAPI({ bookId: id, quantity: item.quantity + 1 });
        }
        dispatch(increaseQty(id));
    }
);

export const decreaseQtyThunk = createAsyncThunk(
    "cart/decreaseQtyThunk",
    async (id, { getState, dispatch }) => {
        const { auth, cart } = getState();
        const item = cart.cartItems.find(i => i._id === id);
        if (auth.user && item && item.quantity > 1) {
            await updateCartAPI({ bookId: id, quantity: item.quantity - 1 });
        }
        dispatch(decreaseQty(id));
    }
);

export const removeFromCartThunk = createAsyncThunk(
    "cart/removeFromCartThunk",
    async (id, { getState, dispatch }) => {
        const { auth } = getState();
        if (auth.user) {
            await updateCartAPI({ bookId: id, quantity: 0 }); // removes item
        }
        dispatch(removeFromCart(id));
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (i)=> i._id === item._id
            );
            if(existingItem){
                existingItem.quantity += item.quantity
            }else{
                state.cartItems.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter(
                (item)=> item._id !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        increaseQty: (state, action)=>{
            const item = state.cartItems.find(
                (i) => i._id === action.payload
            );
            if(item) item.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        decreaseQty: (state, action)=>{
            const item = state.cartItems.find(
                (i) => i._id === action.payload
            );
            if(item && item.quantity > 1) item.quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        clearCart: (state)=>{
            state.cartItems = [];
            localStorage.removeItem("cart");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.cartItems = [];
            localStorage.removeItem("cart");
        });
    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;