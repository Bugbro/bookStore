import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBooks } from "../redux/features/book/bookSlice.js";
import { toggleWishlist } from "../redux/features/wishlist/wishlistSlice.js";

const FiveColCard = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const products = books.data?.slice(0, 4);
  // console.log(books.data);


  useEffect(() => {
    if (!books) {
      dispatch(fetchBooks);
    }
  }, [])

  if (loading) return <p>Loading...</p>;
  return (
    <div className="px-4 md:px-12 lg:px-28 py-3 my-10">
      <div className="flex items-center justify-between ">
        <h2 className="text-xl md:text-2xl font-bold">Our Top Picks</h2>
        <Link to="/products" className="text-sm">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6 ">
        {products?.map((item, i) => (
          <Link
            to={`/products/${item._id}`}
            className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-200 h-fit rounded-2xl hover:scale-105 duration-200 shadow-sm group"
            key={item._id || i}
          >
            <div className="relative">
              <img
                className="rounded-lg h-52 object-cover w-full shadow-md"
                src={item.images?.[0] || assets.dummyImg}
                alt={item.title}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dispatch(toggleWishlist(item._id));
                }}
                className="absolute top-2 right-2 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i className={`fa-heart text-sm ${wishlistItems?.includes(item._id) ? 'fa-solid text-red-500' : 'fa-regular text-gray-500'}`}></i>
              </button>
            </div>
            <p className="text-[#0f8967] text-xs font-semibold uppercase tracking-wider">{item.author}</p>
            <h2 className="font-bold text-gray-800 line-clamp-1">{item.title}</h2>
            <div className="flex items-center gap-1 text-sm">
              {item.rating > 0 ? (
                [...Array(item.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-400 text-xs"></i>
                ))
              ) : (
                <span className="text-gray-400 italic text-xs">No rating yet</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-auto pt-2">
              <p className="font-bold text-lg text-[#0f8967]">${item.sellingPrice}</p>
              {item.actualPrice && item.actualPrice > item.sellingPrice && (
                <p className="text-sm text-gray-500 line-through">${item.actualPrice}</p>
              )}
            </div>
          </Link>
        ))}

        <div className=" col-span-2 lg:col-span-2 flex flex-col gap-2 p-4">
          <img
            className="rounded-lg w-full h-102"
            src={products?.[0]?.images?.[0] || assets.dummyImg}

          />
        </div>
      </div>
    </div>
  );
};

export default FiveColCard;
