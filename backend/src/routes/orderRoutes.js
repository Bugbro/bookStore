import express from "express";
import { getOrderById, getOrders, getUserOrders, placeOrder } from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/", authUser, placeOrder);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/:id', authUser, getOrderById);

//admin
// orderRouter.put('/:id', updateOrderStatus);
// orderRouter.get('/today', getTodayOrders);
// orderRouter.get('/all', getAllOrders);
orderRouter.get('/', getOrders);

export default orderRouter;