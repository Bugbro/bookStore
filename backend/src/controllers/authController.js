import User from "../models/User.js";
import { genJWTandSetCookies } from "../utils/genJWTandSetCookies.js";
import { hashValue } from "../utils/hash.js";
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
        const user = await User.create({
            name,
            email,
            hashPassword
        });
        console.log("User after create", user);

        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 201, "User register successfully");
    } catch (error) {
        console.log("Error while register user", error.message);
        return resHandler(res, 500, error.message);
    }
}