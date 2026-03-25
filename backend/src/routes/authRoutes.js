import express from "express"
import { loginUser, registerUser, getCurrentUser, logoutUser, adminLogin, generateAdminOtp, verifyAdminOtp, adminRegister } from "../controllers/authController.js";
import { authUser } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/me", authUser, getCurrentUser);

//admin login
authRouter.get("/admin/otp", generateAdminOtp);
authRouter.post("/admin/verify-otp", verifyAdminOtp);
authRouter.post("/admin/login", adminLogin);
authRouter.post("/admin/register", adminRegister);

export default authRouter;