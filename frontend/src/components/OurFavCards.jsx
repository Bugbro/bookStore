import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/features/book/bookSlice.js";

const OurFavCards = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  useEffect(() => {
    // If books data is not available, fetch it
    if (!books || !books.data) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books]);

  if (loading) return <p>Loading...</p>;

  // Sort books by rating (descending), top rating first.
  const displayBooks = [...(books?.data || [])]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 10);

  const col1Books = displayBooks.slice(0, 4);
  const col2Book = displayBooks[4];
  const col3Books = displayBooks.slice(5, 9);
  const col4Book = displayBooks[9];

  const rowClasses = ["row-start-1", "row-start-2", "row-start-3", "row-start-4"];

  const renderSmallItem = (item, colIndex, rowIndex) => {
    if (!item) return null;
    return (
      <Link
        key={item._id}
        to={`/products/${item._id}`}
        className={`${colIndex} ${rowClasses[rowIndex]} border-b border-gray-300 flex items-start gap-4 py-2 cursor-pointer hover:bg-gray-100 duration-350 transition-all px-2 rounded-md`}
      >
        <img
          className="h-24 w-16 object-cover rounded-md shadow-sm"
          src={item.images?.[0] || assets.dummyImg}
          alt={item.title}
        />
        <div className="flex gap-1 flex-col w-full">
          <p className="text-[#0f8967] text-xs font-semibold uppercase tracking-wider">{item.author}</p>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            {item.rating > 0 ? (
              [...Array(item.rating)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400 text-xs"></i>
              ))
            ) : (
              <span className="text-gray-400 italic text-xs">No rating yet</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <p className="font-bold text-sm text-[#0f8967]">${item.sellingPrice}</p>
            {item.actualPrice && item.actualPrice > item.sellingPrice && (
              <p className="text-xs text-gray-500 line-through">${item.actualPrice}</p>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const renderLargeItem = (item, colIndex) => {
    if (!item) return null;
    return (
      <Link
        key={item._id}
        to={`/products/${item._id}`}
        className={`${colIndex} row-span-4 border-l border-gray-300 px-4 h-full cursor-pointer hover:bg-gray-100 duration-350 transition-all rounded-md flex justify-evenly flex-col`}
      >
        <img
          className="h-fit max-h-80 w-full object-cover rounded-md shadow-md"
          src={item.images?.[0] || assets.dummyImg}
          alt={item.title}
        />
        <div className="flex gap-2 flex-col mt-4">
          <p className="text-[#0f8967] text-xs font-semibold uppercase tracking-wider">{item.author}</p>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{item.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            {item.rating > 0 ? (
              [...Array(item.rating)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400 text-sm"></i>
              ))
            ) : (
              <span className="text-gray-400 italic text-sm">No rating yet</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="font-bold text-xl text-[#0f8967]">${item.sellingPrice}</p>
            {item.actualPrice && item.actualPrice > item.sellingPrice && (
              <p className="text-base text-gray-500 line-through">${item.actualPrice}</p>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col px-28 py-3 my-10 gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Our Favourite Reads</h2>
        <Link to="/products" className="">
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-4 h-150 border border-gray-300 px-6 py-4 rounded-2xl">
        {/* Column 1 */}
        {col1Books.map((item, i) => renderSmallItem(item, "col-start-1", i))}

        {/* Column 2 Full */}
        {renderLargeItem(col2Book, "col-start-2")}

        {/* Column 3 */}
        {col3Books.map((item, i) => renderSmallItem(item, "col-start-3", i))}

        {/* Column 4 Full */}
        {renderLargeItem(col4Book, "col-start-4")}
      </div>
    </div>
  );
};

export default OurFavCards;
