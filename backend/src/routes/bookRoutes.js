import express from "express";
import { deleteBook, getBookById, getBooks, getBooksByCategory, updateBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.get("/category/:category", getBooksByCategory);
//admin routes
bookRouter.post("/", createBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.put("/:id", updateBook);


export default bookRouter;