const express = require('express');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateReview, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get('/product/:productId', optionalAuth, validateObjectId, async (req, res) => {
  try {
    const productId = req.params.productId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const reviews = await Review.find({ product_id: productId })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Review.countDocuments({ product_id: productId });

    // Calculate average rating
    const ratingStats = await Review.aggregate([
      { $match: { product_id: mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    const stats = ratingStats[0] || { averageRating: 0, totalReviews: 0, ratingDistribution: [] };

    res.json({
      reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews',
      error: error.message
    });
  }
});

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({})
      .populate('product_id', 'name image')
      .populate('user_id', 'user_name email')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Review.countDocuments();

    res.json({
      success: true,
      data: {
        reviews,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reviews',
      error: error.message
    });
  }
});

// @desc    Get review by ID
// @route   GET /api/reviews/:id
// @access  Public
router.get('/:id', optionalAuth, validateObjectId, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('product_id', 'name image');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: {
        review
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching review',
      error: error.message
    });
  }
});

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
router.post('/', protect, validateReview, async (req, res) => {
  try {
    const { product_id, name, rating, comment, image } = req.body;
    const user_id = req.user._id;

    // Check if product exists
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const review = await Review.create({
      product_id,
      user_id,
      name,
      rating,
      comment,
      image
    });

    // Update product rating
    await updateProductRating(product_id);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: {
        review
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating review',
      error: error.message
    });
  }
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;
    const { name, rating, comment, image } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (rating) updateData.rating = rating;
    if (comment) updateData.comment = comment;
    if (image !== undefined) updateData.image = image;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      updateData,
      { new: true, runValidators: true }
    );

    // Update product rating if rating changed
    if (rating && rating !== review.rating) {
      await updateProductRating(review.product_id);
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: {
        review: updatedReview
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating review',
      error: error.message
    });
  }
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review or is admin
    if (review.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    await Review.findByIdAndDelete(reviewId);

    // Update product rating
    await updateProductRating(review.product_id);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting review',
      error: error.message
    });
  }
});

// Helper function to update product rating
async function updateProductRating(productId) {
  try {
    const ratingStats = await Review.aggregate([
      { $match: { product_id: mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (ratingStats.length > 0) {
      const averageRating = Math.round(ratingStats[0].averageRating * 10) / 10;
      await Product.findByIdAndUpdate(productId, { rating: averageRating });
    }
  } catch (error) {
    console.error('Error updating product rating:', error);
  }
}

module.exports = router;
