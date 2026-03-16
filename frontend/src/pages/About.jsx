import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="flex justify-between items-center main-padding">
        <h1>About Us</h1>
        <p>Find out who we are!</p>
      </div>
      <div className="relative h-30 w-[900px] bg-white overflow-visible text-center mx-auto">
        <img
          src={assets.aboutUs}
          alt="About Us"
          className="h-76 w-220 rounded-2xl"
        />
      </div>
      <div className="bg-gray-200 pt-52 flex flex-col items-center ">
        <h2 className="text-2xl font-semibold">Our Success Story</h2>
        <div class="grid grid-cols-2 gap-4  px-54 py-8">
          <div class="grid grid-rows-2 gap-4">
            <div class="bg-blue-100 border border-blue-300 rounded-lg p-4 flex flex-col items-start justify-center">
              <h3>Retail Stores</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatibus iure nam soluta, quia sapiente dolore sunt maxime molestiae doloribus.</p>
            </div>
            <div class="bg-blue-200 border border-blue-400 rounded-lg p-4 flex flex-col  items-start justify-center">
              <h3>Retail Stores</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum natus vel enim sed recusandae. Dignissimos est sunt  et.</p>
            </div>
          </div>

          <div class="bg-green-100 border border-green-300 rounded-lg p-4 flex flex-col items-start justify-center h-full">
            <h3>E-commerce and internet services</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, iusto impedit? Quisquam, itaque alias! Inventore dolor et similique adipisci maxime quibusdam amet nesciunt a explicabo ipsa blanditiis quasi, corrupti voluptatum?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
