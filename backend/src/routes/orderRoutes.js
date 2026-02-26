import express from "express";
import { getOrderById, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", placeOrder);
orderRouter.get('/', getUserOrders);
orderRouter.get('/:id', getOrderById);

//admin
// orderRouter.put('/:id', updateOrderStatus);

export default orderRouter;