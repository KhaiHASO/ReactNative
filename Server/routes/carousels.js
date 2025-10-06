const express = require('express');
const Carousel = require('../models/Carousel');
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all carousels (slides)
// @route   GET /api/slides
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const carousels = await Carousel.find({})
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Carousel.countDocuments();

    res.json({
      carousel: carousels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching carousels',
      error: error.message
    });
  }
});

// @desc    Get carousel by ID
// @route   GET /api/carousels/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found'
      });
    }

    res.json({
      success: true,
      data: {
        carousel
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching carousel',
      error: error.message
    });
  }
});

// @desc    Create new carousel
// @route   POST /api/carousels
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { title_line_1, title_line_2, image, button_text } = req.body;

    if (!title_line_1 || !title_line_2 || !image || !button_text) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: title_line_1, title_line_2, image, button_text'
      });
    }

    const carousel = await Carousel.create({
      title_line_1,
      title_line_2,
      image,
      button_text
    });

    res.status(201).json({
      success: true,
      message: 'Carousel created successfully',
      data: {
        carousel
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating carousel',
      error: error.message
    });
  }
});

// @desc    Update carousel
// @route   PUT /api/carousels/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const carouselId = req.params.id;
    const { title_line_1, title_line_2, image, button_text } = req.body;

    const updateData = {};
    if (title_line_1) updateData.title_line_1 = title_line_1;
    if (title_line_2) updateData.title_line_2 = title_line_2;
    if (image) updateData.image = image;
    if (button_text) updateData.button_text = button_text;

    const carousel = await Carousel.findByIdAndUpdate(
      carouselId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found'
      });
    }

    res.json({
      success: true,
      message: 'Carousel updated successfully',
      data: {
        carousel
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating carousel',
      error: error.message
    });
  }
});

// @desc    Delete carousel
// @route   DELETE /api/carousels/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const carousel = await Carousel.findByIdAndDelete(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found'
      });
    }

    res.json({
      success: true,
      message: 'Carousel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting carousel',
      error: error.message
    });
  }
});

module.exports = router;
