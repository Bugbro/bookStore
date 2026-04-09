import api from "../baseapi/api.js";

export const fetchTodayOrdersAPI = () => {
    return api.get("/orders/today");
}
export const fetchAllOrdersAPI = () => {
    return api.get("/orders/all");
}
export const getOrders = (range) => {
    return api.get(`/orders?range=${range}`);
}
