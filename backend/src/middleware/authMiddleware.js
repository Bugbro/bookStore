import jwt from 'jsonwebtoken';
import { resHandler } from '../utils/resHandler.js';

export const authUser = (req, res, next)=> {
    try {
        const {token} = req.cookies.token;
        if(!token){
            return resHandler(res, 401, "Unauthorized, token not found");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.id){
            return resHandler(res, 401, "Unauthorized, invalid token");
        }
        req.body.userId = decoded;
        next();
    } catch (error) {
        console.log("Error while auth user", error.message);
        return resHandler(res, 500, error.message);
    }
}