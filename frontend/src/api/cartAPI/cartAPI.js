import api from "../axios.js"

export const syncCartAPI = (cartItems) => {
    return api.post("/cart/syncCart", { cartItems });
}

export const addToCartAPI = (data) => {
    return api.post("/cart/addCart", data);
}

export const getCartAPI = () => {
    return api.get("/cart/getCart");
}

export const updateCartAPI = (data) => {
    return api.put("/cart/updateCart", data);
}