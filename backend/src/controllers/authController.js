import User from "../models/User.js";
import { otpCache } from "../utils/cache.js";
import { genJWTandSetCookies } from "../utils/genJWTandSetCookies.js";
import { compareHash, hashValue } from "../utils/hash.js";
import { resHandler } from "../utils/resHandler.js";
import { sendMail } from "../utils/sendMail.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body || {};
        if (!name || !email || !phone || !password) return resHandler(res, 400, "Please provide required fields.");
        //check the existing user
        const existUser = await User.findOne({
            $or: [{ email }, { phone }]
        });
        if (existUser) return resHandler(res, 400, "Email or Phone Number already register. Please Login.");
        //hash password
        const hashPassword = await hashValue(password);
        console.log(hashPassword);
        const user = await User.create({
            name,
            email,
            phone,
            password: hashPassword
        });
        console.log("User after create", user);

        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 201, "User register successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }, "user");
    } catch (error) {
        console.log("Error while register user", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return resHandler(res, 400, "Please provide all fields.");
        const user = await User.findOne({ email });
        if (!user) return resHandler(res, 400, "Email not found.");
        const isMatch = await compareHash(password, user.password);
        if (!isMatch) return resHandler(res, 400, "Password does not match");
        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 200, "User login successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }, "user");
    } catch (error) {
        console.log("Error while login user", error.message);
        return resHandler(res, 500, error.message);
    }
};

//generate otp for admin to register new id in admin panel
export const generateAdminOtp = async (req, res) => {
    try {
        const email = process.env.ADMIN_EMAIL;
        if (!email) return resHandler(res, 400, "Admin email not configured.");
        const otp = Math.floor(1000 + Math.random() * 9000);

        const mailResponse = await sendMail(email, "Admin Otp", `Your Admin Login OTP is: ${otp}`);

        if (mailResponse && mailResponse.error) {
            return resHandler(res, 500, "Failed to send OTP email.");
        }

        otpCache.set(email, otp);
        return resHandler(res, 200, "Otp generated successfully");
    } catch (error) {
        console.log("Error while generating otp", error.message);
        return resHandler(res, 500, error.message);
    }
}

//verfiy otp for admin
export const verifyAdminOtp = (req, res) => {
    try {
        const { otp } = req.body;
        const email = process.env.ADMIN_EMAIL;
        const storedOtp = otpCache.get(email);
        if (!storedOtp) return resHandler(res, 400, "OTP not found");
        if (parseInt(otp) !== storedOtp) return resHandler(res, 400, "Invalid OTP");
        otpCache.set(`${email}_verified`, true, 600); // Mark as verified for 10 minutes
        otpCache.del(email);
        return resHandler(res, 200, "OTP verified successfully");
    } catch (error) {
        console.log("Error while verify admin otp", error.message);
        return resHandler(res, 500, error.message);
    }
}

//register functionality for admin
export const adminRegister = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body || {};
        if (!name || !email || !phone || !password) return resHandler(res, 400, "Please provide all fields.");

        // Check if OTP was verified for this session
        const adminEmail = process.env.ADMIN_EMAIL;
        const isVerified = otpCache.get(`${adminEmail}_verified`);
        if (!isVerified) return resHandler(res, 400, "OTP verification required.");

        const existUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existUser) return resHandler(res, 400, "Email or Phone already exists.");

        const hashedPassword = await hashValue(password);
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: "admin"
        });

        otpCache.del(`${adminEmail}_verified`);
        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 201, "Admin registered successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }, "user");
    } catch (error) {
        console.log("Error while register admin", error.message);
        return resHandler(res, 500, error.message);
    }
}

//login functionality for admin
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return resHandler(res, 400, "Please provide all fields.");
        const user = await User.findOne({ email });
        if (!user) return resHandler(res, 400, "Email not found.");
        if (user.role !== "admin") return resHandler(res, 400, "You are not authorized to login as admin.");
        const isMatch = await compareHash(password, user.password);
        if (!isMatch) return resHandler(res, 400, "Password does not match");
        genJWTandSetCookies(res, user._id, user.role);
        return resHandler(res, 200, "Admin login successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }, "user");
    } catch (error) {
        console.log("Error while login admin", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return resHandler(res, 200, "User logout successfully");
    } catch (error) {
        console.log("Error while logout user", error.message);
        return resHandler(res, 500, error.message);
    }
}

export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resHandler(res, 200, "Not authenticated", null, "user");
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return resHandler(res, 200, "Not authenticated", null, "user");
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return resHandler(res, 200, "User not found", null, "user");
        
        return resHandler(res, 200, "User fetched successfully", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar
        }, "user");
    } catch (error) {
        console.log("Error while getting current user", error.message);
        return resHandler(res, 200, "Not authenticated", null, "user");
    }
}

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) return resHandler(res, 400, "Google credential is required");

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                avatar: picture,
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            if (!user.avatar) user.avatar = picture;
            await user.save();
        }

        genJWTandSetCookies(res, user._id, user.role);

        return resHandler(res, 200, "User logged in successfully with Google", {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || "",
            avatar: user.avatar
        }, "user");
    } catch (error) {
        console.log("Error in google login", error.message);
        return resHandler(res, 500, error.message);
    }
};