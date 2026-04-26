import express from 'express';
import { subscribe } from '../controllers/newsLetterController.js';

const newsLetterRouter = express.Router();

newsLetterRouter.post('/subscribe', subscribe);

export default newsLetterRouter;