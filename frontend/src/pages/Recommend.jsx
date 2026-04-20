import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularBooks } from "../redux/features/recommendation/recommendationSlice.js";

const Recommend = () => {

    const [mode, setMode] = useState("popular"); // "popular" or "search"
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const { popular: popularBooks } = useSelector((state) => state.recommendation);
    console.log("Popular Books", popularBooks);

    //  Fetch popular books on load
    useEffect(() => {
        dispatch(fetchPopularBooks());
    }, []);





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
                <div className="mb-6 flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter book name..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border px-4 py-2 w-full rounded"
                    />
                    <button
                        onClick={fetchRecommendations}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                </div>
            )}
            {mode === "popular" && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {popularBooks?.map((book, index) => {
                        // The dataset ratings seem to be out of 10, so we divide by 2 for a 5-star system
                        const starRating = Math.min(5, Math.round(book.avg_ratings / 2)) || 0;
                        return (
                            <div key={index} className="flex flex-col gap-2 p-4 cursor-pointer hover:bg-gray-200 h-fit rounded-2xl hover:scale-105 duration-200">
                                <img src={book["Image-URL-M"]} alt={book["Book-Title"]} className="rounded-lg aspect-3/4 w-full object-cover" />
                                <p className="text-[#0f8967] text-xs">{book["Book-Author"]}</p>
                                <h2 className="font-bold line-clamp-2 text-sm" title={book["Book-Title"]}>{book["Book-Title"]}</h2>
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
                                    <span className="text-xs text-gray-500">({book.num_ratings})</span>
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