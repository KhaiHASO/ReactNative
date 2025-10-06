const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  calories: {
    type: Number,
    min: [0, 'Calories cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  old_price: {
    type: Number,
    min: [0, 'Old price cannot be negative']
  },
  rating: {
    type: Number,
    required: [true, 'Product rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  images: [{
    type: String
  }],
  sizes: [{
    type: String
  }],
  size: {
    type: String
  },
  colors: [{
    type: String
  }],
  color: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  categories: [{
    type: String
  }],
  category: [{
    type: String
  }],
  is_bestseller: {
    type: Boolean,
    default: false
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  is_out_of_stock: {
    type: Boolean,
    default: false
  },
  is_new: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ name: 1 }, { 
  name: 'idx_product_name',
  collation: { locale: 'en', strength: 2 }
});
productSchema.index({ category: 1 }, { name: 'idx_product_category' });
productSchema.index({ is_featured: 1 }, { name: 'idx_featured' });
productSchema.index({ is_bestseller: 1 }, { name: 'idx_bestseller' });

// Update updated_at field
productSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Virtual for discount percentage
productSchema.virtual('discount_percentage').get(function() {
  if (this.old_price && this.old_price > this.price) {
    return Math.round(((this.old_price - this.price) / this.old_price) * 100);
  }
  return 0;
});

module.exports = mongoose.model('Product', productSchema);
