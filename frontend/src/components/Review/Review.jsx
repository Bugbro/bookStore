import RatingDistribution from "./RatingDistribution.jsx";
import ShowReview from "./ShowReview.jsx";
import SubmitReview from "./SubmitReview.jsx";

const Review = () => {

    const rating = 3.5;
    const totalReviews = 128;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


    return (
        <div className="py-8">
            <div className="mb-4">
                <h3 className="text-2xl font-semibold ">Customer Reviews</h3>
                <div className="flex gap-2 items-center my-2">
                    <p className="text-yellow-500">
                        {[...Array(fullStars)].map((_, index) => (
                            <i
                                key={`full-${index}`}
                                className="fa-solid fa-star"
                            ></i>
                        ))}

                        {hasHalfStar && (
                            <i className="fa-solid fa-star-half-stroke"></i>
                        )}

                        {[...Array(emptyStars)].map((_, index) => (
                            <i
                                key={`empty-${index}`}
                                className="fa-regular fa-star"
                            ></i>
                        ))}
                    </p>
                    <p className="font-semibold text-lg">{rating}</p>
                    <p className="text-gray-500">Based on {totalReviews} Reviews</p>
                </div>
            </div>
            {/* 2nd raitng distribut and Submit/Update review */}
            <div className="flex flex-col md:flex-row gap-4 lg:gap-12">
                <RatingDistribution />
                <SubmitReview />
            </div>

            {/* show reviews */}
            <ShowReview />
        </div>
    )
}
export default Review;