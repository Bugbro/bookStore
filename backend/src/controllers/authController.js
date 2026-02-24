import User from "../models/User.js";
import { genJWTandSetCookies } from "../utils/genJWTandSetCookies.js";
import { compareHash, hashValue } from "../utils/hash.js";
import { resHandler } from "../utils/resHandler.js";

export const registerUser = async (req, res) => {
    try {
        const {name, email, phone , password} = req.body || {};
        if(!name || !email || !phone || !password) return resHandler(res, 400, "Please provide required fields.");
        //check the existing user
        const existUser = await User.findOne({
            $or: [{email}, {phone}]
        });
        if(existUser) return resHandler(res, 400, "Email or Phone Number already register. Please Login.");
        //hash password
        const hashPassword = await hashValue(password);
        console.log(hashPassword);
        const user = await User.create({
            name,
            email,
            password:hashPassword
        });
        console.log("User after create", user);

        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 201, "User register successfully");
    } catch (error) {
        console.log("Error while register user", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const {email, password}= req.body || {};
        if(!email || !password) return resHandler(res, 400, "Please provide all fields.");
        const user = await User.findOne({email});
        if(!user) return resHandler(res, 400, "Email not found.");
        const isMatch = await compareHash(password, user.password);
        if(!isMatch) return resHandler(res, 400, "Password does not match" );
        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 200, "User login successfully");
    } catch (error) {
        console.log("Error while login user", error.message);
        return resHandler(res, 500, error.message);
    }
};

//login functionality for admin
export const adminLogin = async(req, res)=>{
    try {
        const {email, password}= req.body || {};
        if(!email || !password) return resHandler(res, 400, "Please provide all fields.");
        const user = await User.findOne({email});
        if(!user) return resHandler(res, 400, "Email not found.");
        if(user.role !== "admin") return resHandler(res, 400, "You are not authorized to login as admin.");
        const isMatch = await compareHash(password, user.password);
        if(!isMatch) return resHandler(res, 400, "Password does not match" );
        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 200, "Admin login successfully");
    } catch (error) {
        console.log("Error while login admin", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const logoutUser = async (req, res)=>{
    try {
        res.clearCookie("token");
        return resHandler(res, 200, "User logout successfully");
    } catch (error) {
        console.log("Error while logout user", error.message);
        return resHandler(res, 500, error.message);
    }
}