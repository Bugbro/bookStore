import nodemailer from "nodemailer";

const getTransporter = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        },
    });
};

export const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `Admin <${process.env.ADMIN_EMAIL}>`,
            to,
            subject,
            text
        };
        const transporter = getTransporter();
        const info = await transporter.sendMail(mailOptions);
        console.log("Mail sent successfully");
        return info;
    } catch (error) {
        console.log("Error while sending mail", error.message);
        return { error: error.message };
    }
};