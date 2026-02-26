import Cart from "../models/Cart";
import Order from "../models/Order.js";
import { resHandler } from "../utils/resHandler.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { deliveryAddress } = req.body;
        if(!deliveryAddress || !deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.pincode || !deliveryAddress.phone){
            return resHandler(res, 400, "All delivery address fields are required");
        }
        const cart = await Cart.findOne({ userId}).populate("items.bookId");
        if(!cart || cart.items.length === 0){
            return resHandler(res, 400, "Cart is empty");
        }

        const order = await Order.create({
            userId,
            items: cart.items,
            totalAmount: cart.totalPrice,
            deliveryAddress,
            status: "Pending",
        });

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return resHandler(res, 201, "Order placed successfully", order);
    } catch (error) {
        console.log("Error while creating order:", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId }).populate("items.bookId");
        if(!orders || orders.length === 0){
            return resHandler(res, 404, "No orders found for this user");
        }
        return resHandler(res, 200, "User orders retrieved successfully", orders);
    } catch (error) {
        console.log("Error while getting user orders", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getOrderById = async (req, res) => {
    try {
        const id = req.params;
        const order = await Order.findById(id).populate("items.bookId").populate("userId", "name email");
        if(!order){
            return resHandler(res, 404, "Order not found");
        }
        return resHandler(res, 200, "Order retrieved successfully", order);
    } catch (error) {
        console.log("Error while getting order by ID", error.message);
        return resHandler(res, 500, error.message);
    }
}

// admin
export const updateOrderStatus = async(req,res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;
        const allowedStatus = ["pending", "processing", "shipped", "delivered"];
        if(!allowedStatus.includes(status)){
            return resHandler(res, 400, "Invalid status value");
        }
        const order = await Order.findByIdAndUpdate(
            id,
            {status},
            {new: true}
        );
        if(!order){
            return resHandler(res, 404, "Order not found");
        }
        return resHandler(res, 200, "Order status updated successfully", order);
    } catch (error) {
        console.log("Error while updating the order:", error.message);
        return resHandler(res, 500, error.message);
    }
};