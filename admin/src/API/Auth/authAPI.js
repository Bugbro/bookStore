import api from "../BaseAPI/api.js";

export const registerAPI = async (data) => {
    return api.post("/auth/admin/register", data);
}

export const loginAPI = async (data) => {
    return api.post("/auth/admin/login", data);
}