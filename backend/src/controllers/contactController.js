import { resHandler } from "../utils/resHandler.js";
import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body || {};
        if (!name || !email || !phone || !message) {
            return resHandler(res, 400, "Please provide all the fields.");
        }
        const contact = new Contact({
            name,
            email,
            phone,
            message,
        });
        await contact.save();
        return resHandler(res, 200, "Message sent successfully");
    } catch (error) {
        console.log(error);
        return resHandler(res, 500, error.message);
    }
};