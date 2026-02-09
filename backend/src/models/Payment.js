import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    provider:{
        type: String,
        enum:["Razorpay","Cod"],
        required: true
    },
    transactionId:{
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum:[ "Pending", "Success", "Failed"],
        default: "Pending"
    },
},{timestamps: true});

export default mongoose.model("Payment", paymentSchema);