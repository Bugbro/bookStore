import Order from "../models/Order.js";
import { resHandler } from "../utils/resHandler.js";


//only for admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1});

        return resHandler(res, 200, "All orders are......", orders);
    } catch (error) {
        console.log("Error while getting all orders", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        if(!orderId) return resHandler(res, 404, "Please provide order id");
        const order = await Order.findById(orderId)
        .populate("userId", "name email");
        if(!order) return resHandler(res, 404, "Order not found.");

        return resHandler(res, 200, "Here the serached order", order);
    } catch (error) {
        console.log("Error while getting order by ID.", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const {status} = req.body;
        if(!status) return resHandler(res, 400, "Status is missing.");
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        return resHandler(res, 200, "Order status updated", order);
    } catch (error) {
        console.log("Error while updating order", error.message);
        return resHandler(res, 500, error.message);
    }
}

export const getDashBoardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalBooks = await Book.countDocuments();
        const deliveredOrders = await Order.find({ status: "Delivered" });

        const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.totalAmount, 0);
        const stats = {
            totalUsers,
            totalOrders,
            totalBooks,
            totalRevenue
        }

        return resHandler(res, 200, "Here is the dashboard stats", stats);
    } catch (error) {
        console.log("Error while getting dashboard stats", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getTotalRevenue = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Delivered" });
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        return resHandler(res, 200, "Total revenue calculated", totalRevenue);
    } catch (error) {
        console.log("Error while getting total revenue", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getTodayRevenue = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const orders = await Order.find({
            status: "Delivered",
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        });

        const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        return resHandler(res, 200, "Today's revenue calculated", totalRevenue);
    } catch (error) {
        console.log("Error while getting today's revenue", error.message);
        return resHandler(res, 500, error.message);
    }    
}