import api from "../baseapi/api.js";

export const getAllBooksAPI = (page = 1, limit = 10) => {
    return api.get(`/books?page=${page}&limit=${limit}`);
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