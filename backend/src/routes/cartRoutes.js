import express from 'express';
import { addToCart, getCart, updateCart, syncCart } from '../controllers/cartController.js';
import { authUser } from '../middleware/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/addCart', authUser, addToCart);
cartRouter.put('/updateCart', authUser, updateCart);
cartRouter.get('/getCart', authUser, getCart);
cartRouter.post('/syncCart', authUser, syncCart);

export default cartRouter;