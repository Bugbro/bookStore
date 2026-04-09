import api from "../baseapi/api.js";

export const getAllBooksAPI = () => {
    return api.get("/books");
}
export const addBookAPI = (data) => {
    return api.post("/books", data);
}