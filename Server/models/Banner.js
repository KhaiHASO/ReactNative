const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Banner title is required'],
    trim: true
  },
  title1: {
    type: String,
    required: [true, 'First title is required'],
    trim: true
  },
  title2: {
    type: String,
    required: [true, 'Second title is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Banner image is required']
  },
  btnText: {
    type: String,
    required: [true, 'Button text is required'],
    trim: true
  },
  description1: {
    type: String,
    trim: true
  },
  description2: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('Banner', bannerSchema);
