import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";

const OurFavCards = () => {
  const currency = "₹";
  const items = [
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
    },
  ];
  return (
    <div className="flex flex-col px-28 py-3 my-10 gap-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Our Favourite Reads</h2>
        <Link to="/products" className="">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-4 h-150 border border-gray-300 px-6  py-4 rounded-2xl">
        {/* Column 1 */}
        <div className="col-start-1 row-start-1 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-1 row-start-2 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-1 row-start-3 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-1 row-start-4 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>

        {/* Column 2 Full */}
        <div className="col-start-2 row-span-4 border-l border-gray-300 px-4  h-full cursor-pointer hover:bg-gray-100 duration-350 transition-all  rounded-md flex justify-evenly flex-col">
            <img className="h-fit rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="col-start-3 row-start-1 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-3 row-start-2 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-3 row-start-3 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
        <div className="col-start-3 row-start-4 border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md">
          <img className="h-full rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>

        {/* Column 4 Full */}
        <div className="col-start-4 row-span-4 border-l border-gray-300 px-4  h-full cursor-pointer hover:bg-gray-100 duration-350 transition-all  rounded-md flex justify-evenly flex-col">
            <img className="h-fit rounded-md" src={assets.theSecret} alt="The Secret" />
          <div className="flex gap-1 flex-col">
            <p className="text-xs">{items[0].author}</p>
            <h3 className="text-base font-semibold">{items[0].title}</h3>
            <div>
              {[...Array(items[0].star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))}
            </div>
            <p className="text-sm font-semibold text-[#0f8967]">
              {currency}
              {items[0].price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFavCards;
