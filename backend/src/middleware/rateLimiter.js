import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2, // limit each IP to 2 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});