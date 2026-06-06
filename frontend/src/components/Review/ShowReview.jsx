import UserReviewCard from "./UserReviewCard.jsx";
const ShowReview = () => {

    // dummy data later change 
    const reviewData = {
        reviews: [
            {
                _id: "review_1",
                userId: {
                    _id: "user_1",
                    name: "John Doe",
                    avatar: "https://i.pravatar.cc/150?img=1"
                },
                rating: 5,
                comment:
                    "Excellent book! The content is well structured and easy to understand. Highly recommended.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-05T10:30:00Z"
            },
            {
                _id: "review_2",
                userId: {
                    _id: "user_2",
                    name: "Sarah Smith",
                    avatar: "https://i.pravatar.cc/150?img=2"
                },
                rating: 4,
                comment:
                    "Great read. Some chapters could have been more detailed but overall very useful.",
                isVerifiedPurchase: true,
                createdAt: "2026-06-03T15:20:00Z"
            },
            {
                _id: "review_3",
                userId: {
                    _id: "user_3",
                    name: "Michael Johnson",
                    avatar: "https://i.pravatar.cc/150?img=3"
                },
                rating: 5,
                comment:
                    "One of the best books I've purchased this year.",
                isVerifiedPurchase: false,
                createdAt: "2026-06-01T08:15:00Z"
            },
            {
                _id: "review_4",
                userId: {
                    _id: "user_4",
                    name: "Emma Wilson",
                    avatar: "https://i.pravatar.cc/150?img=4"
                },
                rating: 3,
                comment:
                    "Average book. Expected a bit more practical examples.",
                isVerifiedPurchase: true,
                createdAt: "2026-05-28T11:45:00Z"
            },
            {
                _id: "review_5",
                userId: {
                    _id: "user_5",
                    name: "David Brown",
                    avatar: "https://i.pravatar.cc/150?img=5"
                },
                rating: 2,
                comment:
                    "Not my favorite. The writing style wasn't engaging enough.",
                isVerifiedPurchase: false,
                createdAt: "2026-05-25T17:10:00Z"
            }
        ],

        pagination: {
            totalReviews: 128,
            currentPage: 1,
            totalPages: 26,
            limit: 5
        },

        averageRating: 4.7
    };

    return (
        <div className="mt-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-semibold">
                    Reviews
                </h3>

                <select className="border rounded-lg px-4 py-2 outline-none">
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Highest Rating</option>
                    <option>Lowest Rating</option>
                </select>

            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-6">

                {reviewData.reviews.map((review) => (
                    <UserReviewCard
                        key={review._id}
                        review={review}
                    />
                ))}

                <div className="w-full text-center mt-2">
                    <button className="bg-white border-2 cursor-pointer border-green-300  px-4 md:px-8 py-2 md:py-4 text-green-600 font-semibold">Load More Reviews</button>
                </div>

            </div>

        </div>
    )
}

export default ShowReview;