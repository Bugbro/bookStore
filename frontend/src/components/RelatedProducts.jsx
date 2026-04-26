import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedBooks } from "../redux/features/book/bookSlice.js";
import { toggleWishlist } from "../redux/features/wishlist/wishlistSlice.js";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ bookCategory, bookId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const relatedBooks = useSelector((state) => state.books.relatedBooks);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const showRelatedBooks = relatedBooks.data?.filter(
    (item) => item._id !== bookId,
  );
  console.log(showRelatedBooks);

  const prevCategory = useRef(null);

  useEffect(() => {
    if (!bookCategory) return;

    if (prevCategory.current !== bookCategory) {
      dispatch(fetchRelatedBooks(bookCategory));
      prevCategory.current = bookCategory;
    }
  }, [bookCategory]);

  console.log(relatedBooks);

  return (
    <div className="text-xl font-semibold my-10">
      <h2>Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {
          showRelatedBooks?.map((item, i) =>
          (
            <div onClick={() => navigate(`/products/${item._id}`)}
              key={item._id}
              className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-200 h-fit rounded-2xl hover:scale-105 duration-200 group"
            >

              <div className="relative">
                <img
                  className="rounded-lg aspect-3/4 w-full  object-cover"
                  src={item.images?.[0]}
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

              <p className="font-bold text-[#0f8967]">${item.sellingPrice}</p>

            </div>
          )
          )
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
