import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchRelatedBooks } from "../redux/features/book/bookSlice";
import { toggleWishlist } from "../redux/features/wishlist/wishlistSlice.js";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { books, relatedBooks, loading, relatedBookLoading } = useSelector((state) => state.books);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryQuery]);

  useEffect(() => {
    if (categoryQuery) {
      dispatch(fetchRelatedBooks(categoryQuery));
    } else {
      dispatch(fetchBooks({ searchQuery, page: currentPage, limit: 10 }));
    }
  }, [dispatch, searchQuery, categoryQuery, currentPage]);

  const products = categoryQuery ? (relatedBooks?.data || []) : (books?.data?.books || []);
  const totalPages = !categoryQuery ? (books?.data?.totalPages || 1) : 1;
  const currentPageNum = !categoryQuery ? (books?.data?.currentPage || 1) : 1;
  const isLoading = categoryQuery ? relatedBookLoading : loading === "loading";

  if (isLoading)
    return (
      <p className="flex items-center justify-center h-[60vh]">
        Loading...
      </p>
    );

  if (!categoryQuery && loading === "failed")
    return (
      <p className="flex items-center justify-center h-[60vh]">
        Error loading products. Please try again.
      </p>
    );

  return (
    <div className="px-4 py-2 lg:px-28 lg:py-3 my-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {products.length > 0 ? (
          products.map((item) => (
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
              <div className="flex items-center gap-3">
                <p className="font-bold text-[#0f8967]">${item.sellingPrice}</p>
                <p className="font-bold line-through text-[#979797] text-xs">${item.actualPrice}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 font-semibold py-10">
            No products found{categoryQuery ? ` in "${categoryQuery}" category` : ""}.
          </p>
        )}

      </div>

      {/* Pagination Controls */}
      {!categoryQuery && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPageNum === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPageNum === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0f8967] text-white hover:bg-[#0d7255]'}`}
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${currentPageNum === i + 1 ? 'bg-[#0f8967] text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPageNum === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${currentPageNum === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#0f8967] text-white hover:bg-[#0d7255]'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;