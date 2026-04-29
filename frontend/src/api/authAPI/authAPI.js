import api from "../axios.js";

export const loginAPI = (data) => {
    return api.post("/auth/login", data);
}

export const registerAPI = (data) => {
    return api.post("/auth/register", data);
}

export const googleLoginAPI = (data) => {
    return api.post("/auth/google", data);
}