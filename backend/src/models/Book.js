import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    actualPrice: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
    },
    images: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 10,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);