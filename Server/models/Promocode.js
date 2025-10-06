const mongoose = require('mongoose');

const promocodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Promocode name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Promocode is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  discount: {
    type: Number,
    required: [true, 'Discount amount is required'],
    min: [0, 'Discount cannot be negative']
  },
  expires_at: {
    type: Date,
    required: [true, 'Expiration date is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Index for code and expires_at
promocodeSchema.index({ code: 1 }, { unique: true, name: 'uniq_promocode_code' });
promocodeSchema.index({ expires_at: 1 }, { name: 'idx_expires_at' });

// Check if promocode is valid
promocodeSchema.methods.isValid = function() {
  return this.expires_at > new Date();
};

module.exports = mongoose.model('Promocode', promocodeSchema);
