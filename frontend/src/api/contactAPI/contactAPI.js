import api from "../axios.js";

export const submitContactFormAPI = (data) => {
    return api.post("/contact", data);
}