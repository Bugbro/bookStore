import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
        {/* top line */}
      <div className="px-28 py-3 bg-black text-white flex justify-between items-center w-full text-sm">
        <div className="flex items-center justify-between gap-6 ">
          <p>
            <i class="fa-solid fa-phone-volume"></i> +91 9816496136
          </p>
          <p>
            <i class="fa-solid fa-envelope"></i> bookstore@gmail.com
          </p>
        </div>
        <div className="flex items-center justify-between gap-6 ">
          <i class="fa-brands fa-meta"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-codiepie"></i>
        </div>
      </div>

      {/* middle bar */}
      <div className="px-28 py-3 bg-white text-black flex justify-between items-center w-full border-b-[#17BD8D]/40 border-b">
        <div className="w-40"><img src={assets.logo} alt="logo" /></div>
        <div className="flex flex-1 items-center justify-end gap-6 ">

          {/* search fild */}
            <div className="bg-[#efefef] pl-4  rounded-full w-1/2 flex items-center justify-between">
              <input className="w-full outline-none font-medium px-2 py-3" type="text" placeholder="Search Products...." />
              <span className="bg-[#17BD8D] cursor-pointer text-white py-3 px-6  mr-0 rounded-full hover:bg-[#15ae83] duration-200"> <i class="fas fa-search  "></i></span>
            </div>
            <div className="flex gap-4 text-xl">
              <a href="#" className="flex gap-2 items-center  hover:text-[#17BD8D] duration-150"><i class="fas fa-location"></i><span className="border-b font-semibold text-sm">Find a book store</span></a>
              <div><i class="fa-regular fa-user"></i></div>
              <div><i class="fa-regular fa-heart"></i></div>
              <div><i class="fa-solid fa-bag-shopping"></i></div>
            </div>
        </div>
      </div>

      {/* below bar */}
      <div className="px-28 py-3 flex items-center justify-between ">
        <div className="bg-[#17BD8D] text-white px-4 py-1 rounded-full">
          <i class="fa-solid fa-list-ul"></i>
          <select name="category" id="" className="pl-2 pr-20 py-2 hover:white font-semibold bg-[#17BD8D] outline-none">
            <option value="Category">Category</option>
            <option value="History">History </option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
          </select>
        </div>

        {/* links */}
        <div className="flex gap-6 text-sm font-bold text-[#0f8967]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="flex items-center gap-4 ">
          <div className="text-[#17BD8D] bg-[#efefef] flex items-center p-3 rounded-full"><i class="fa-solid fa-phone-volume "></i></div> 
          <div>
            <p className="text-[#17BD8D] text-sm font-semibold">+91 9816496136</p>
            <p className="text-xs">24/7 Support Center</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
