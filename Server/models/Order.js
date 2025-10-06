const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  size: {
    type: String
  },
  color: {
    type: String
  }
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  items: {
    type: [orderItemSchema],
    required: [true, 'Order items are required'],
    validate: [arrayLimit, 'Order must have at least one item']
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative']
  },
  delivery: {
    type: Number,
    required: [true, 'Delivery fee is required'],
    min: [0, 'Delivery fee cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  total: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    required: [true, 'Order status is required'],
    enum: {
      values: ['pending', 'paid', 'preparing', 'delivering', 'delivered', 'cancelled'],
      message: 'Status must be one of: pending, paid, preparing, delivering, delivered, cancelled'
    },
    default: 'pending'
  },
  shipping_address: {
    type: mongoose.Schema.Types.Mixed
  },
  payment_method: {
    type: String,
    trim: true
  },
  promocode_code: {
    type: String,
    trim: true
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
orderSchema.index({ user_id: 1, created_at: -1 }, { name: 'idx_orders_user_created' });
orderSchema.index({ status: 1 }, { name: 'idx_orders_status' });

// Validate items array
function arrayLimit(val) {
  return val && val.length > 0;
}

// Update updated_at field
orderSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Populate user information
orderSchema.pre('find', function() {
  this.populate('user_id', 'user_name email phone_number');
  this.populate('items.product_id', 'name image');
});

module.exports = mongoose.model('Order', orderSchema);
