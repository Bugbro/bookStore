import api from "../baseapi/api.js";

export const getAllBooksAPI = () => {
    return api.get("/books");
}