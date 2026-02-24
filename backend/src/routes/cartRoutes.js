import express from 'express';
import { addToCart, getCart, updateCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.get('/addCart', addToCart);
cartRouter.put('/updateCart', updateCart);
cartRouter.get('/getCart', getCart);

export default cartRouter;