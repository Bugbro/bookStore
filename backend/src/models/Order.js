import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items:[{
        bookId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
        },
        quantity: Number,
        price: Number,
    }],
    totalAmount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum:["pending", "processing", "shipped", "delivered"],
        default:"pending",
    },
    paymentMethod:{
        type: String,
        enum: ["COD", "Online"],
        default: "COD",
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
    },
    deliveryAddress:{
        name: String,
        email: String,
        street: String,
        city: String,
        state: String,
        pincode: String,
        phone: String,
    },
},{timestamps:true});

export default mongoose.model("Order", orderSchema);