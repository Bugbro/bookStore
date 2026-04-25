import api from "../axios.js";

export const placeOrderAPI = (orderData) => {
    return api.post("/orders/", orderData);
};
export const getUserOrdersAPI = () => {
    return api.get("/orders/user");
};