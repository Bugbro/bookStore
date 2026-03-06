import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../redux/features/bookSlice";

const FiveColCard = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const products = books.data?.slice(0, 4);
  
  useEffect(()=>{
    if(!books){
      dispatch(fetchBooks);
    }
  },[])

  if (loading) return <p>Loading...</p>;
  return (
    <div className="px-28 py-3 my-10">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Our Favourite Reads</h2>
        <Link to="/products" className="">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6 ">
        {products?.map((item, i) => (
          <div
            className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-200 h-fit rounded-2xl hover:scale-103 duration-200"
            key={i}
          >
            <img
              className="rounded-lg h-52"
              src={item.images[0]}
              alt={item.title}
            />
            <p className="text-[#0f8967] text-xs">{item.author}</p>
            <h2 className="font-bold line-clamp-1">{item.title}</h2>
            <p className="text-sm">
              {item.rating > 0 ? (
                [...Array(item.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                ))
              ) : (
                <span className="text-gray-400 italic">No rating yet</span>
              )}
            </p>
            <p className="font-bold text-[#0f8967]">${item.price}</p>
          </div>
        ))}

        <div className=" col-span-2 lg:col-span-2 flex flex-col gap-2 p-4">
          <img
            className="rounded-lg w-full h-102"
            src={products[0].images[0]}
            alt={products[0].title}
          />
        </div>
      </div>
    </div>
  );
};

export default FiveColCard;
