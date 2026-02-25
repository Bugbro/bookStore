import Cart from "../models/Cart";
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
}