export const validateContactForm = (data) => {
    if (!data.name.trim()) return "Name is required";

    if (!data.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(data.email)) return "Invalid email";

    if (!data.phone.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(data.phone)) return "Invalid phone number";

    if (!data.message.trim()) return "Message is required";
    if (data.message.length < 10) return "Message too short";

    return null;
};