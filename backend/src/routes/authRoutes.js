import express from "express"
import { loginUser, registerUser, getCurrentUser, logoutUser, adminLogin } from "../controllers/authController.js";
import { authUser } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authUser, getCurrentUser);

//admin login
authRouter.get("/admin/otp",)
authRouter.post("/admin/login", adminLogin);

export default authRouter;