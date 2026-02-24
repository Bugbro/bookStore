import Book from "../models/Book.js";
import Cart from "../models/Cart.js";
import { resHandler } from "../utils/resHandler.js";

export const addToCart = async(req, res)=>{
    try {
        const {bookId, quantity} = req.body || {};
        if(!bookId || !quantity) return resHandler(res, 400, "Please provide all fields.");
        const userId = req.user.id; //get from auth middleware
        const book = await Book.findById(bookId);
        if(!book) return resHandler(res, 404, "Book not found.");
        let cart = await Cart.findOne({user: userId});
        if(!cart){
            cart = new Cart({
                user: userId,
                items: [{
                    bookId,
                    quantity,
                    price: book.price,
                }],
                totalPrice: book.price * quantity,
            });
        } else{
            const itemIndex = cart.items.findIndex(item=> item.bookId.toString() === bookId);
            if(itemIndex > -1 ){
                cart.items[itemIndex].quantity += quantity;
            }else{
                cart.items.push({
                    bookId,
                    quantity,
                    price: book.price,
                });
            }
            cart.totalPrice = cart.items.reduce((acc, item)=> acc + item.price * item.quantity, 0);
            await cart.save();
            return resHandler(res, 200, "Book added to cart successfully", cart);
        }

    } catch (error) {
        console.log("Error while adding to cart", error.message);
        return resHandler(res, 500, error.message);
    }
};

//update cart item
export const updateCart = async(req, res)=>{
    try {
        const {bookId, quantity} = req.body || {};
        if(!bookId || !quantity) return resHandler(res, 400, "Please provide all fields.");
        const userId = req.user.id;
        const cart = await Cart.findOne({userId});
        if(!cart) return resHandler(res, 404, "Cart not found.");
        const itemIndex = cart.items.findIndex(item=> item.bookId.toString() === bookId);
        if(itemIndex === -1) return resHandler(res, 404, "Book not found in cart.");
        if(quantity <= 0){
            cart.items.splice(itemIndex, 1);
        }else{
            cart.items[itemIndex].quantity = quantity;
        }
        cart.totalPrice = cart.items.reduce((acc, item)=> acc + item.price * item.quantity, 0);
        await cart.save();
        return resHandler(res, 200, "Cart updated successfully", cart);
    } catch (error) {
        console.log("Error while updating cart", error.message);
        return resHandler(res, 500, error.message);
    }
};

export const getCart = async(req, res)=>{
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({userId}).populate("items.bookId");
        if(!cart) return resHandler(res, 404, "Cart not found.");
        return resHandler(res, 200, "Cart fetched successfully", cart);
    } catch (error) {
        console.log("Error while getting user cart", error.message);
        return resHandler(res, 500, error.message)
    }
};

//we can also add remove from cart and clear cart functions here as well.