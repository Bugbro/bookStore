import { resHandler } from "../utils/resHandler.js";
import Subscriber from "../models/Subscriber.js";


export const subscribe = async (req, res) => {
    try {
        const { email } = req.body || {};
        if (!email) return resHandler(res, 400, "Please provide email");
        const subscriber = await Subscriber.findOne({ email });
        if (subscriber) return resHandler(res, 400, "Already subscribed");
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        return resHandler(res, 200, "Subscribed successfully");
    } catch (error) {
        console.log(error);
        return resHandler(res, 500, error.message);
    }
}