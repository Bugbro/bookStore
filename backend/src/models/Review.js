import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        index: true,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 1000,
    },
    isVerifiedPurchase: {
        type: Boolean,
        default: false
    },
    isvisible: {
        type: Boolean,
        default: true
    },
    adminReply: {
        type: String,
        trim: true,
        default: ""
    }
}, { timestamps: true });

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });
export default mongoose.model("Review", reviewSchema);