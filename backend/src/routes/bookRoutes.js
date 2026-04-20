import express from "express";
import { createBook, deleteBook, getBookById, getBooks, getBooksByCategory, getPopularBooks, getRecommendationBooks, updateBook } from "../controllers/bookController.js";
import upload from "../middleware/multer.js";

const bookRouter = express.Router();

bookRouter.get("/", getBooks);

//python recommendation
bookRouter.get("/popular", getPopularBooks);
bookRouter.post("/recommendation/:bookName", getRecommendationBooks);

bookRouter.get("/:id", getBookById);
bookRouter.get("/category/:category", getBooksByCategory);
//admin routes
bookRouter.post("/", upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), createBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.put("/:id", updateBook);


export default bookRouter;