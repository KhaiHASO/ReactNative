const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Notification date is required'],
    default: Date.now
  }
}, {
  timestamps: false
});

// Index for date
notificationSchema.index({ date: -1 }, { name: 'idx_notification_date' });

module.exports = mongoose.model('Notification', notificationSchema);
