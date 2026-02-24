import express from "express";
import { getAllOrders, getDashBoardStats, getMonthlyRevenue, getOrderById, getTodayRevenue, getTotalRevenue, getYearlyRevenue, updateOrderStatus } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/getAllOrder", getAllOrders);
adminRouter.get("/getOrderById/:id", getOrderById);
adminRouter.put("/updateOrderStatus/:id", updateOrderStatus);
adminRouter.get("/getDashBoardStats", getDashBoardStats);
adminRouter.get("/getTotalRevenue", getTotalRevenue);
adminRouter.get("/getTodayRevenue", getTodayRevenue);
adminRouter.get("/getMonthly", getMonthlyRevenue);
adminRouter.get("/getYearlyRevenue", getYearlyRevenue);

export default adminRouter;