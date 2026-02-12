import jwt from "jsonwebtoken"

export const genJWTandSetCookies = (res, userId, role)=>{
    const token = jwt.sign({userId, role}, process.env.JWT_SECRET);
    res.cookie("token", token,{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    });
}