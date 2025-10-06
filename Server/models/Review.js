const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Reviewer name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    required: [true, 'Review date is required'],
    default: Date.now
  }
}, {
  timestamps: false
});

// Index for product_id and date
reviewSchema.index({ product_id: 1, date: -1 }, { name: 'idx_reviews_product_date' });

// Populate product information
reviewSchema.pre('find', function() {
  this.populate('product_id', 'name image');
});

module.exports = mongoose.model('Review', reviewSchema);
