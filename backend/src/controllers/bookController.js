import Book from "../models/Book.js";
import { resHandler } from "../utils/resHandler.js"

//for admin
export const createBook = async (req, res) => {
    try {
        const {title, author, price, discount, category, images, description, stock} = req.body || {};
        if(!title || !author || !price || !category || !images || !description || !stock) return resHandler(res, 400, "Please provide all required fields.");
        const book = await Book.create({
            title,
            author,
            price,
            discount,
            category,
            images,
            description,
            stock
        });
        return resHandler(res, 201, "Book created successfully", book);
    } catch (error) {
        console.log("Error while created book", error.message);
        return resHandler(res, 500, error.message)
    }
};

export const deleteBook = async(req, res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book) return resHandler(res, 404, "Book not found.");
        return resHandler(res, 200, "Book deleted successfully");
    } catch (error) {
        console.log("Error while deleting book", error.message);
        return resHandler(res, 500, error.message);
    }
};
export const updateBook = async(req, res)=>{
    try {
        if(Object.keys(req.body).length === 0) return resHandler(res, 400, "Please provide fields to update.");
        const updateBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if(!updateBook) return resHandler(res, 404, "Book not found.");
        return resHandler(res, 200, "Book updated successfully", updateBook);
    } catch (error) {
        console.log("Error while updating book", error.message);
        return resHandler(res, 500, error.message);
    }
}


//for all
export const getBooks = async(req, res)=>{
    try {
        const books = (await Book.find()).sort({createdAt: -1});
        if(!books) return resHandler(res, 404, "Books not found.");
        return resHandler(res, 200, "Books get successfully", books);
    } catch (error) {
        console.log("Error while getting  book", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getBookById = async(req, res)=>{
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return resHandler(res, 404, "Book not found.");
        return resHandler(res, 200, "Book get successfully", book);
    } catch (error) {
        console.log("Error while getting by id", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getBooksByCategory = async(req, res)=>{
    try {
        const category = req.params.category.toLowerCase();
        const books = await Book.find({category});
        if(!books || books.length === 0) return resHandler(res, 404, "Books not found for this category.");
        return resHandler(res, 200, "Books get successfully", books);
    } catch (error) {
        console.log("Error while getting books by category", error.message);
        return resHandler(res, 500, error.message);
    }
};