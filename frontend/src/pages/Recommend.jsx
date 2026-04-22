import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularBooks, fetchRecommendations } from "../redux/features/recommendation/recommendationSlice.js";
import { useNavigate } from "react-router-dom";

const Recommend = () => {

    const [mode, setMode] = useState("popular"); // "popular" or "search"
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { popular: popularBooks, recommendations, loading, error } = useSelector((state) => state.recommendation);


    //  Fetch popular books on load
    useEffect(() => {
        dispatch(fetchPopularBooks());
    }, []);

    const handleSearch = async () => {
        if (query.trim()) {
            await dispatch(fetchRecommendations(query));
        }
    };





    return (
        <div className="px-4 py-2 lg:px-28 lg:py-3 my-10">
            <h2 className="text-2xl font-bold mb-6">Recommended Books</h2>

            {/* Toggle Buttons */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setMode("popular")}
                    className={`px-4 py-2 rounded ${mode === "popular" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                >
                    Popular
                </button>

                <button
                    onClick={() => setMode("search")}
                    className={`px-4 py-2 rounded ${mode === "search" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                >
                    Search Recommendation
                </button>
            </div>

            {/*  Search Input */}
            {mode === "search" && (
                <>
                    <div className="mb-6 flex gap-3">
                        <input
                            type="text"
                            placeholder="Enter book name..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="border px-4 py-2 w-full rounded"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Search
                        </button>
                    </div>

                    {loading && <div className="text-center py-10 text-gray-500">Loading...</div>}

                    {error && !loading && (
                        <div className="text-center py-10 text-red-500">No related book found.</div>
                    )}

                    {!loading && !error && recommendations?.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {recommendations.map((book, index) => {
                                const title = book.title || book["Book-Title"];
                                const author = book.author || book["Book-Author"];
                                const image = book.images?.[0] || book.image || book["Image-URL-M"];
                                const starRating = book.rating !== undefined ? book.rating : Math.min(5, Math.round((book.avg_ratings || 0) / 2)) || 0;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => book.inStock !== false && book._id && navigate(`/products/${book._id}`)}
                                        className={`flex flex-col gap-2 p-4 h-fit rounded-2xl duration-200 ${book.inStock === false ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200 hover:scale-105'}`}
                                    >
                                        <div className="relative">
                                            <img src={image} alt={title} className="rounded-lg aspect-3/4 w-full object-cover" />
                                            {book.inStock === false && (
                                                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                                                    <span className="bg-red-500 text-white px-2 py-1 rounded font-bold text-sm">Out of Stock</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[#0f8967] text-xs">{author}</p>
                                        <h2 className="font-bold line-clamp-2 text-sm" title={title}>{title}</h2>
                                        {book.inStock === false && (
                                            <p className="text-red-500 text-xs font-bold">Out of Stock</p>
                                        )}
                                        {(book.sellingPrice || book.actualPrice) && (
                                            <div className="flex items-center gap-2">
                                                {book.sellingPrice && <span className="font-bold text-[#0f8967]">${book.sellingPrice}</span>}
                                                {book.actualPrice && <span className="text-gray-500 line-through text-xs">${book.actualPrice}</span>}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 mt-auto">
                                            <p className="text-xs">
                                                {starRating > 0 ? (
                                                    [...Array(starRating)].map((_, i) => (
                                                        <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 italic">No rating</span>
                                                )}
                                            </p>
                                            <span className="text-xs text-gray-500">({book.num_ratings || 0})</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {!loading && !error && recommendations?.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            {query ? "No related book found." : "Search for a book to see recommendations."}
                        </div>
                    )}
                </>
            )}
            {mode === "popular" && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {popularBooks?.map((book, index) => {
                        const title = book.title || book["Book-Title"];
                        const author = book.author || book["Book-Author"];
                        const image = book.images?.[0] || book.image || book["Image-URL-M"];
                        const starRating = book.rating !== undefined ? book.rating : Math.min(5, Math.round((book.avg_ratings || 0) / 2)) || 0;
                        return (
                            <div
                                key={index}
                                onClick={() => book.inStock !== false && book._id && navigate(`/products/${book._id}`)}
                                className={`flex flex-col gap-2 p-4 h-fit rounded-2xl duration-200 ${book.inStock === false ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200 hover:scale-105'}`}
                            >
                                <div className="relative">
                                    <img src={image} alt={title} className="rounded-lg aspect-3/4 w-full object-cover" />
                                    {book.inStock === false && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                                            <span className="bg-red-500 text-white px-2 py-1 rounded font-bold text-sm">Out of Stock</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[#0f8967] text-xs">{author}</p>
                                <h2 className="font-bold line-clamp-2 text-sm" title={title}>{title}</h2>
                                {book.inStock === false && (
                                    <p className="text-red-500 text-xs font-bold">Out of Stock</p>
                                )}
                                {(book.sellingPrice || book.actualPrice) && (
                                    <div className="flex items-center gap-2">
                                        {book.sellingPrice && <span className="font-bold text-[#0f8967]">${book.sellingPrice}</span>}
                                        {book.actualPrice && <span className="text-gray-500 line-through text-xs">${book.actualPrice}</span>}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-auto">
                                    <p className="text-xs">
                                        {starRating > 0 ? (
                                            [...Array(starRating)].map((_, i) => (
                                                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                                            ))
                                        ) : (
                                            <span className="text-gray-400 italic">No rating</span>
                                        )}
                                    </p>
                                    <span className="text-xs text-gray-500">({book.num_ratings || 0})</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

        </div>
    );
};

export default Recommend;