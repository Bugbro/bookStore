const UserReviewCard = ({ review }) => {

    const fullStars = review.rating;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-2 md:px-6 py-4">

            <div className="flex justify-between items-start">

                {/* Left Side */}
                <div className="flex gap-4">

                    <img
                        src={review.userId.avatar}
                        alt={review.userId.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                        <div className="flex items-center gap-1 md:gap-3 flex-wrap">

                            <h4 className="text-sm md:text-xl font-semibold">
                                {review.userId.name}
                            </h4>

                            {review.isVerifiedPurchase && (
                                <span className="text-green-600 border border-green-300 bg-green-50 px-2 md:px-3 py-1 rounded-md text-[8px] md:text-xs font-semibold">
                                    <i className="fa-solid fa-circle-check mr-1"></i>
                                    VERIFIED PURCHASE
                                </span>
                            )}

                        </div>

                        <p className="text-gray-500 font-medium text-sm">
                            {new Date(review.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>

                </div>

                {/* Right Side Rating */}
                <div className="flex gap-1 text-yellow-500 text-xs md:text-lg">

                    {[...Array(5)].map((_, index) => (
                        <i
                            key={index}
                            className={
                                index < fullStars
                                    ? "fa-solid fa-star"
                                    : "fa-regular fa-star"
                            }
                        ></i>
                    ))}

                </div>

            </div>

            {/* Review Content */}
            <div className="mt-2">
                <p className="text-gray-700 text-sm">
                    {review.comment}
                </p>
            </div>

        </div>
    );
};

export default UserReviewCard;