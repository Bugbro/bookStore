import api from "../baseapi/api.js";

export const fetchTodayOrdersAPI = () => {
    return api.get("/orders/today");
}
export const fetchAllOrdersAPI = () => {
    return api.get("/orders/all");
}
export const getOrders = (range, page = 1, limit = 4) => {
    return api.get(`/orders?range=${range}&page=${page}&limit=${limit}`);
}
export const updateOrderStatusAPI = (id, status) => {
    return api.put(`/orders/${id}`, { status });
}
