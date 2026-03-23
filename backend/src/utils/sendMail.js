import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD
    },
});

export const sendMail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: `Admin <${process.env.ADMIN_EMAIL}>`,
            to,
            subject,
            text
        };
        await transpoter.sendMail(mailOptions);
        console.log("Mail sent successfully");
    } catch (error) {
        console.log("Error while sending mail", error.message);

    }
};