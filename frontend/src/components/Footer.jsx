import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { subscribeAPI } from "../api/newsLetterAPI/newsLetterAPI.js";
import { toast } from 'react-toastify';

const Footer = () => {

  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      const response = await subscribeAPI({ email });
      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="px-4 md:px-12 lg:px-28  py-10 flex flex-col items-center bg-black text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="order-1 flex flex-col items-start gap-2 pr-8">
          <img className="w-50 " src={assets.logo} alt="logo" />
          <p className="text-lg mb-4">Check out the new latest Books.Shop Now!</p>
          <a href="#"><i className="fa-solid fa-phone-volume mr-2"></i> +91 9816496136</a>
          <a href="#"><i className="fa-solid fa-envelope mr-2"></i> info@gmaiil.com</a>
        </div>

        <div className="order-3  lg:order-2 flex flex-col items-start gap-4">
          <h3 className="text-xl mb-4">Contact Info</h3>
          <p className="">Address:. <span className="block text-[#d6d4d4]">Tehsil Arki, Distt. Solan, HP</span> </p>
          <p>Visit at store: <span className="block text-[#d6d4d4]">Mon-Fri: 9:00 AM - 6:00 PM</span> </p>
        </div>

        <div className="order-4  lg:order-3 flex flex-col items-start gap-2">
          <h3 className="text-xl mb-4">Explore</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/recommend">Recommend</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="order-2  lg:order-4">
          <h3 className="text-xl mb-4">Subscribe</h3>
          <p>Enter your email to get latest updates!</p>
          <div className="flex bg-white text-black rounded-full py-1 mt-8">
            <input className="flex-1 outline-none pl-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
            <button onClick={handleSubscribe} className="bg-[#17BD8D] font-semibold text-white mr-2 px-4 py-2 rounded-full cursor-pointer ">Subscribe</button>
          </div>
        </div>
      </div>

      {/* 2nd part copyright */}
      <div className="flex items-center justify-center text-[#d6d4d4] border-t border-white w-full mt-10 pt-5  ">
        <p> © 2024 BookStore. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
