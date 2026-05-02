import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      {/* <div className="flex justify-between items-center main-padding">
        <h1>About Us</h1>
        <p>Find out who we are!</p>
      </div> */}
      <div className="relative h-30 w-225 bg-white overflow-visible text-center mx-auto">
        <img
          src={assets.aboutUs}
          alt="About Us"
          className="h-76 w-220 rounded-2xl"
        />
      </div>
      <div className="bg-gray-200 pt-52 flex flex-col items-center pb-4">
        <h2 className="text-2xl font-semibold mb-4">Our Success Story</h2>
        <div class="grid grid-cols-2 gap-4 w-220 mx-auto  ">
          <div class="grid grid-rows-2 gap-2">
            <div class="aboutUsContainer">
              <h3>Retail Stores</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptatibus iure nam soluta, quia sapiente dolore sunt maxime molestiae doloribus.</p>
            </div>
            <div class="aboutUsContainer">
              <h3>Retail Stores</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum natus vel enim sed recusandae. Dignissimos est sunt  et.</p>
            </div>
          </div>

          <div class="aboutUsContainer h-full">
            <h3 className="mb-3">E-commerce and internet services</h3>
            <p className="mb-3">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, iusto impedit? Inventore dolor et similique adipisci maxime quibusdam amet nesciunt a explicabo ipsa blanditiis quasi, corrupti voluptatum?</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex fuga itaque ea. Consectetur numquam excepturi ratione .</p>
          </div>
        </div>
        {/* two images and quotes */}
        <div className="flex gap-8 w-260">
          <div className="flex flex-col items-end">
            <img className="rounded-md mb-4" src={assets.geogreMatin} alt="George R.R. Martin" />
            <p className="text-gray-400 w-116 text-right">"A reader lives a thousand lives before he dies. The man who never reads lives only one." -- <span className="text-gray-800 font-semibold text-sm">George R.R. Martin</span></p>
          </div>
          <div className="flex flex-col items-end">
            <img className="rounded-md mb-4" src={assets.geogreMatin} alt="George R.R. Martin" />
            <p className="text-gray-400 w-116 text-right">"A reader lives a thousand lives before he dies. The man who never reads lives only one." -- <span className="text-gray-800 font-semibold text-sm">George R.R. Martin</span></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
