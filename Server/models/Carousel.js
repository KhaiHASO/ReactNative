const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title_line_1: {
    type: String,
    required: [true, 'First title line is required'],
    trim: true
  },
  title_line_2: {
    type: String,
    required: [true, 'Second title line is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Carousel image is required']
  },
  button_text: {
    type: String,
    required: [true, 'Button text is required'],
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

module.exports = mongoose.model('Carousel', carouselSchema);
