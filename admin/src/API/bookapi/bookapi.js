import api from "../baseapi/api.js";

export const getAllBooksAPI = () => {
    return api.get("/books");
}
export const addBookAPI = (data) => {
    return api.post("/books", data);
}
export const updateBookAPI = (id, data) => {
    return api.put(`/books/${id}`, data);
}
export const deleteBookAPI = (id) => {
    return api.delete(`/books/${id}`);
}