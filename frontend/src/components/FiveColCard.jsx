import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const FiveColCard = () => {
  const products = [
    {
      title: "The Alchemist",
      star: 4,
      image: assets.theSecret,
      price: "100",
      author: "Paulo Coelho",
    },
    {
      title: "The Alchemist",
      star: 4,
      image: assets.theSecret,
      price: "100",
      author: "Paulo Coelho",
    },
    {
      title: "The Alchemist",
      star: 4,
      image: assets.theSecret,
      price: "100",
      author: "Paulo Coelho",
    },
    {
      title: "The Alchemist",
      star: 4,
      image: assets.theSecret,
      price: "100",
      author: "Paulo Coelho",
    }
  ];
  return (
    <div className="px-28 py-3 my-10">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Our Favourite Reads</h2>
        <Link to="/products" className="">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6 ">
        <div className="flex flex-col gap-2 p-4">
          <img className="rounded-lg" src={products[0].image} alt={products[0].title} />
          <p className="text-[#0f8967]">{products[0].author}</p>
          <h2 className="font-semibold">{products[0].title}</h2>
          <p>{[...Array(products[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))} </p>
          <p className="font-semibold">${products[0].price}</p>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <img className="rounded-lg" src={products[0].image} alt={products[0].title} />
          <p className="text-[#0f8967]">{products[0].author}</p>
          <h2 className="font-semibold">{products[0].title}</h2>
          <p>{[...Array(products[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))} </p>
          <p className="font-semibold">${products[0].price}</p>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <img className="rounded-lg" src={products[0].image} alt={products[0].title} />
          <p className="text-[#0f8967]">{products[0].author}</p>
          <h2 className="font-semibold">{products[0].title}</h2>
          <p>{[...Array(products[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))} </p>
          <p className="font-semibold">${products[0].price}</p>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <img className="rounded-lg" src={products[0].image} alt={products[0].title} />
          <p className="text-[#0f8967]">{products[0].author}</p>
          <h2 className="font-semibold">{products[0].title}</h2>
          <p>{[...Array(products[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))} </p>
          <p className="font-semibold">${products[0].price}</p>
        </div>

        <div className=" col-span-2 lg:col-span-2 flex flex-col gap-2 p-4">
          <img className="rounded-lg w-full h-102" src={products[0].image} alt={products[0].title} />
          
        </div>

      </div>
    </div>
  );
};

export default FiveColCard;
