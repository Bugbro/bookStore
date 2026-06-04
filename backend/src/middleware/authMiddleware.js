import jwt, { decode } from 'jsonwebtoken';
import { resHandler } from '../utils/resHandler.js';


/**
 * 
 * 1. Auth only user 
 * 
 */
export const authUser = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resHandler(res, 401, "Unauthorized");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return resHandler(res, 401, "Unauthorized, invalid token");
        }

        // GET requests where body is undefined, and set req.user
        req.user = { id: decoded.userId };
        req.body = req.body || {};
        req.body.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("Error while auth user", error.message);
        return resHandler(res, 500, error.message);
    }
}

/**
 * 
 * 2. Auth for admin
 * 
 */
export const authAdmin = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resHandler(res, 401, "Unauthorized");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return resHandler(res, 401, "Unauthorized, invalid token");
        }
        if (decoded.role !== "admin") {
            return resHandler(res, 403, "Access denied. Admin Only.");
        }
        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };
        next();

    } catch (error) {
        console.log("Error while auth admin.", error.message);
        return resHandler(res, 500, error.message);
    }
}