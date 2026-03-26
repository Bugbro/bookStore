import api from "../baseapi/api.js";

export const registerAPI = (data) => {
    return api.post("/auth/admin/register", data);
}

export const loginAPI = (data) => {
    return api.post("/auth/admin/login", data);
}

export const generateOtp = () => {
    return api.get("/auth/admin/otp");
}

export const verifyOtp = (data) => {
    return api.post("/auth/admin/verify-otp", data);
}

export const getMeAPI = () => {
    return api.get("/auth/me");
}

export const logoutAPI = () => {
    return api.post("/auth/logout");
}