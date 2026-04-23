import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, fetchRelatedBooks } from "../redux/features/book/bookSlice";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { books, relatedBooks, loading, relatedBookLoading } = useSelector((state) => state.books);
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";

  useEffect(() => {
    if (categoryQuery) {
      dispatch(fetchRelatedBooks(categoryQuery));
    } else {
      dispatch(fetchBooks(searchQuery));
    }
  }, [dispatch, searchQuery, categoryQuery]);

  const products = categoryQuery ? (relatedBooks?.data || []) : (books?.data || []);
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
              className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-200 h-fit rounded-2xl hover:scale-105 duration-200"
            >
              <img
                className="rounded-lg aspect-3/4 w-full  object-cover"
                src={item.images?.[0]}
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
    </div>
  );
};

export default Products;