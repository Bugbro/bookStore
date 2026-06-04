import { resHandler } from "../../utils/resHandler.js";
import Review from "../../models/Review.js";
import Order from "../../models/Order.js";

//create and update review
export const createAndUpateReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId, rating, comment } = req.body;
        if (!bookId) {
            return resHandler(res, 400, "BookId is required");
        }
        if (!rating || rating < 1 || rating > 5) {
            return resHandler(res, 400, "Rating must be between 1 and 5");
        }
        if (!comment || !comment.trim()) {
            return resHandler(res, 400, "Review Comment is required");
        }

        const product = await Product.findById(productId);
        if (!product) {
            return resHandler(res, 404, "Product not found");
        }

        const purchasedBook = await Order.findOne({
            userId,
            "items.bookId": bookId,
            status: "delivered",
        })

        const isVerifiedPurchase = !!purchasedBook;
        let review = await Review.findOne({
            userId,
            bookId,
        })
        if (review) {
            review.rating = rating;
            review.comment = comment;
            review.isVerifiedPurchase = isVerifiedPurchase;
            await review.save();
            return resHandler(res, 200, "Review Update successfully", review)
        }
        review = await Review.create({
            userId,
            bookId,
            rating,
            comment,
            isVerifiedPurchase
        });
        return resHandler(res, 201, "Review created successfully", review);

    } catch (error) {
        console.log("Error while creating/updating review.", error.message);
        return resHandler(res, 500, error.message);
    }
}

// get product review which show on  product detail page
export const getProductReviews = async (req, res) => {
    try {
        const { bookId } = req.params;
        if (!bookId) return resHandler(res, 400, "Book Id is required");
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const reviews = await Review.find({
            bookId,
            isVisible: true
        })
            .populate("userId", "name avatar")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalReviews = await Review.countDocuments({
            bookId,
            isVisible: true,
        });
        const ratingData = await Review.aggregate([
            {
                $match: {
                    bookId: new mongoose.Types.ObjectId(bookId),
                    isVisible: true,
                },
            },
            {
                $group: {
                    _id: "$bookId",
                    averageRating: {
                        $avg: "$rating",
                    },
                },
            },
        ]);

        const averageRating = ratingData.length > 0 ? ratingData[0].averageRating.toFixed(1) : 0;
        return resHandler(res, 200, "Reviews fetched successfully", {
            reviews,
            pagination: {
                totalReviews,
                currentPage: page,
                totalPages: Math.ceil(totalReviews / limit),
                limit
            },
            averageRating,
        });

    } catch (error) {
        console.log("Error while fetching product reviews.", error.message);
        return resHandler(res, 500, error.message)
    }
}

// user review on user profile
export const getUserReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const [reviews, totalReviews] = await Promise.all([
            Review.find({ userId })
                .populate("bookId", "title images")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Review.countDocuments({ userId }),
        ]);

        const totalPages = Math.ceil(totalReviews / limit);
        return resHandler(res, 200, "Reviews fetched successfully", {
            reviews,
            pagination: {
                currentPage: page,
                totalPages,
                totalReviews,
                limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        });
    } catch (error) {
        console.log("Error while fetching user reviews.", error.message);
        return resHandler(res, 500, error.message);
    }
}

/**
 * 
 * 4. User delete it own review
 * 
 */
export const deleteMyReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;
        if (!reviewId) return resHandler(res, 400, "Review id is required");
        if (!userId) return resHandler(res, 400, "User id is required");
        const deleteReview = await Review.findOneAndDelete({
            _id: reviewId,
            userId,
        });
        if (!deleteReview) {
            return resHandler(res, 404, "Review not found or unauthorized.");
        }
        return resHandler(res, 200, "Review deleted successfully");
    } catch (error) {
        console.log("Error while deleting user review.", error.message);
        return resHandler(res, 500, error.message);
    }
}
