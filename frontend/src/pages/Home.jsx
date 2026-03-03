import React from "react";
import { assets } from "../assets/assets.js";
import Card from "../components/Card.jsx";
import OurFavCards from "../components/OurFavCards.jsx";
import FiveColCard from "../components/FiveColCard.jsx";
import ServiceBar from "../components/ServiceBar.jsx";

const Home = () => {
  return (
    <div className="">
      <div
        className="px-28 py-3 flex items-center justify-evenly bg-center bg-cover bg-no-repeat h-[50vh] w-full"
        style={{ backgroundImage: `url(${assets.mainBg})` }}
      >
        <div className="text-white flex flex-col gap-6 w-1/2">
          <p className="text-sm ">SPECIAL OFFER</p>
          <h2 className="text-6xl font-bold ">
            Discover Stories That Stay With You
          </h2>
          <p>Check out the stories that will stay with you forever.</p>
          <a
            href="/shop"
            className="bg-white text-[#0f8967] hover:bg-white/96 hover:text-[#0f8967] font-semibold duration-300 px-5 py-3 rounded-full w-fit flex items-center gap-2"
          >
            <span>Shop Now</span> <i class="fa-solid fa-angle-right"></i>
          </a>
        </div>
        <div className="h-full">
          <img className="h-full" src={assets.mainBooks} alt="Main Books" />
        </div>
      </div>
      <div className="flex items-center  gap-4 px-28 py-3 h-80 my-10">
        <Card subHead="Summer Sale" title="Sale 25% OFF" button="Shop Now" textBg="text-white" bgImage={assets.cardAlchemist} bgGradient="#2173b2]" />
        <Card subHead="Novel Everyday" title="Sale 45% OFF" button="Shop Now" textBg="text-black" bgImage={assets.cardIkigia} />
      </div>
      <OurFavCards/>
      <FiveColCard/>
      <ServiceBar/>
    </div>
  );
};

export default Home;
