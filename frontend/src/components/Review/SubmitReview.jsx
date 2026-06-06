import { useState } from "react";
import { toast } from 'react-toastify';

const SubmitReview = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const clearFrom = () => {
        setComment("");
        setRating(0);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating) {
            return toast.error("Minimum Rating required 1 star");
        }
        if (!comment.trim()) {
            return toast.error("Please enter your review");
        }
        console.log("Review Submitted", rating, comment);
        clearFrom();
        //later dispatch function here by the data
    }

    return (
        <div className="bg-gray-100 p-[12px] md:p-[24px] rounded flex flex-col gap-2 w-full md:w-[60%]">
            <h3 className="text-xl font-semibold">Submit Your Review</h3>
            <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div>


                    <div className="flex justify-between gap-2 text-2xl">
                        <div>
                            <label className="mr-2 text-xs">
                                Your Rating
                            </label>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button type="button" key={star} onClick={() => setRating(star)} className="cursor-pointer text-lg">
                                    <i className={star <= rating ? "fa-solid fa-star text-yellow-500" : "fa-regular fa-star text-gray-300"} />
                                </button>
                            ))}
                        </div>
                        <div className="hidden md:block">
                            {rating >= 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Selected Rating: {rating}/5
                                </p>
                            )}
                        </div>

                    </div>


                </div>
                {/* Review Comment description */}
                <div className="mt-2">
                    <label className="block mb-2 font-medium"> Review Description:</label>
                    <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience with this book..." className="w-full border border-gray-300  rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-200" />
                </div>

                {/* submit btn */}
                <div className="flex gap-2 items-center justify-end">
                    <button type="submit" className="bg-green-600 text-white px-3 py-2 md:py-3 md:px-4 rounded-lg font-medium hover:bg-green-700 transition">
                        Submit Review
                    </button>
                    <button type="button" onClick={clearFrom} className="bg-white text-black px-3 py-2 md:py-3 md:px-4 rounded-lg font-medium hover:bg-gray-200 transition ">
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}
export default SubmitReview;