import { assets } from "../assets/assets";
import { useState } from "react";
import { submitContactFormAPI } from "../api/contactAPI/contactAPI.js";
import { validateContactForm } from "../utils/validators/contactValidators.js";
import { toast } from 'react-toastify';

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMsg = validateContactForm(formData);

        if (errorMsg) {
            return toast.error(errorMsg);
        }
        try {
            const response = await submitContactFormAPI(formData);

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className=" flex flex-col md:flex-row gap-2 mb-8 border border-[#17BD8D]/20 rounded-xl px-2 md:px-[112px] py-16">
            {/* form section */}
            <div className="w-full md:w-1/2 p-4">
                <h1 className="text-xl font-semibold">Have Questions? We're just a Message awau.!</h1>
                <p className="text-base">Fill out the form below, and one of our team member will get bact to you shortly.</p>
                <form className="flex flex-col gap-1 " onSubmit={handleSubmit}>
                    <label className="font-semibold mt-3" htmlFor="name">Name</label>
                    <input className="bg-gray-100 p-2 outline-none rounded-md" type="text" placeholder="Your Name" name="name" value={formData.name} onChange={handleOnChange} required />
                    <label className="font-semibold mt-3" htmlFor="email">Email</label>
                    <input className="bg-gray-100 p-2 outline-none rounded-md" type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleOnChange} required />
                    <label className="font-semibold mt-3" htmlFor="phone">Mobile No.</label>
                    <input className="bg-gray-100 p-2 outline-none rounded-md" type="tel" placeholder="Mobile No." name="phone" value={formData.phone} onChange={handleOnChange} required />
                    <label className="font-semibold mt-3" htmlFor="message">Message</label>
                    <textarea className="bg-gray-100 p-2 outline-none rounded-md" name="message" id="message" value={formData.message} onChange={handleOnChange} placeholder="Enter your message...." required></textarea>
                    <button className="bg-[#17BD8D]/80 w-fit px-4 py-2 rounded-md mt-2 cursor-pointer font-semibold text-[#fff] hover:bg-[#17BD8D] duration-200">Send Message</button>
                </form>
            </div>

            {/* rigth side image */}
            <div className="w-full md:w-1/2 p-4">
                <img src={assets.contact} alt="Contact Us" className="rounded-xl" />
                <div className="flex gap-2 items-center my-4">
                    <div className="flex items-start gap-2 mr-4 border border-gray-200 px-4 py-2 rounded-md">
                        <i className="fa-solid fa-house"></i>
                        <p className="text-sm">123AB Te. Arki, Distt. Solan, H.P.</p>
                    </div>
                    <div className="flex items-start gap-2  border border-gray-200 px-4 py-2 rounded-md">
                        <i className="fa-solid fa-calendar"></i>
                        <p className="text-sm">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
                <div className="tolltipWrapper flex justify-center my-4">
                    <a href="#">
                        <div className="icon instagram">
                            <span><i className="fab fa-instagram"></i></span>
                            <div className="tooltip">
                                Instagram
                            </div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="icon yt">
                            <span><i className="fa-brands fa-youtube"></i></span>
                            <div className="tooltip">
                                Youtube
                            </div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="icon meta">
                            <span><i className="fab fa-meta"></i></span>
                            <div className="tooltip">
                                Meta
                            </div>
                        </div>
                    </a>
                    <a href="#">
                        <div className="icon whatsapp">
                            <span><i className="fab fa-twitch"></i></span>
                            <div className="tooltip">
                                What'sapp
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </div>
    );
};

export default ContactForm;