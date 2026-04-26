import api from "../axios.js";

export const subscribeAPI = (data) => {
    return api.post("/newsletter/subscribe", data);
}