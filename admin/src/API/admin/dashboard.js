import api from "../baseapi/api.js";

export const getTotalRevenueAPI = () => {
    return api.get("/admin/getTotalRevenue");
}

export const getTodayRevenueAPI = () => {
    return api.get("/admin/getTodayRevenue");
}

export const getMonthlyRevenueAPI = () => {
    return api.get("/admin/getMonthlyRevenue");
}

export const getYearlyRevenueAPI = () => {
    return api.get("/admin/getYearlyRevenue");
}