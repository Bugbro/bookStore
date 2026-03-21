import { createSlice } from "@reduxjs/toolkit";
const savedCart = localStorage.getItem("cart");
const initialState = {
    cartItems: savedCart ? JSON.parse(savedCart) : []
};
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
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter(
                (item)=> item._id !== action.payload
            );
        },
        increaseQty: (state, action)=>{
            const item = state.cartItems.find(
                (i) => i._id === action.payload
            );
            if(item) item.quantity += 1;
        },
        decreaseQty: (state, action)=>{
            const item = state.cartItems.find(
                (i) => i._id === action.payload
            );
            if(item && item.quantity > 1) item.quantity -= 1;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty
} = cartSlice.actions;

export default cartSlice.reducer;