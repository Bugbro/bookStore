import { resHandler } from "../../utils/resHandler.js";
import Review from "../../models/Review.js";
import Order from "../../models/Order.js";
/**
 * 
 * Admin Functions: 
 * 1. getAllReview: supports pagination, filter by book name, rating, and date range 
 * 
 */
export const getAllReviews = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            rating,
            bookName,
            startDate,
            endDate
        } = req.query;
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const filter = {};
        if (rating) {
            filter.rating = Number(rating);
        }
        if (startDate || endDate) {
            fiter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        let reviews = await Review.find(filter)
            .populate("userId", "name email")
            .populate("bookId", "title")
            .sort({ createdAt: -1 });

        if (bookName) {
            reviews = reviews.filter(
                (review) =>
                    review.bookId && review.bookId.title.toLowerCase().includes(bookName.toLowerCase())
            );
        }

        const totalReviews = reviews.length;

        const paginatedReviews = reviews.slice(
            (pageNum - 1) - limitNum,
            pageNum * limitNum
        );

        const totalPages = Math.ceil(totalReviews / limitNum);
        return resHandler(res, 200, "Reviews fetched successfully", {
            reviews: paginatedReviews,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalReviews,
                limit: limitNum,
            },
        });

    } catch (error) {
        console.log("Error while fetching all reviews", error.message);
        return resHandler(res, 500, error.message);
    }
}

/**
 * 
 * 2. Admin toggle review: hide show
 * 
 */
export const toggleReviewVisibility = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) {
            return resHandler(res, 200, "Review not found")
        }
        review.isVisible = !review.isVisible;
        await review.save();
        return resHandler(res, 200, "Review visibility toggled successfully");

    } catch (error) {
        console.log("Error while toggling review visibility", error.message);
        return resHandler(res, 500, error.message)
    }
}

/**
 * 
 * 3. Admin delete review
 * 
 */
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId);
        if (!review) {
            return resHandler(res, 200, "Review not found")
        }
        await Review.findByIdAndDelete(reviewId);
        return resHandler(res, 200, "Review deleted successfully");

    } catch (error) {
        console.log("Error while deleting review", error.message);
        return resHandler(res, 500, error.message)
    }
}