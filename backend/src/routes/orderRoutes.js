import express from "express";
import { getOrderById, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js";
import { authUser } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/", authUser, placeOrder);
orderRouter.get('/', authUser, getUserOrders);
orderRouter.get('/:id', authUser, getOrderById);

//admin
// orderRouter.put('/:id', updateOrderStatus);

export default orderRouter;