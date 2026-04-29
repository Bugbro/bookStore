import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    password:{
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    avatar: {
        type: String,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    address:{
        street: String,
        city: String,
        state: String,
        pincode: String,
        phone: String
    },
},{timestamps: true});

export default mongoose.model("User", userSchema);