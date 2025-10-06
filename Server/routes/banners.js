const express = require('express');
const Banner = require('../models/Banner');
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all banners
// @route   GET /api/banners
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const banners = await Banner.find({})
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Banner.countDocuments();

    res.json({
      banners
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching banners',
      error: error.message
    });
  }
});

// @desc    Get banner by ID
// @route   GET /api/banners/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      data: {
        banner
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching banner',
      error: error.message
    });
  }
});

// @desc    Create new banner
// @route   POST /api/banners
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { title, title1, title2, image, btnText, description1, description2 } = req.body;

    if (!title || !title1 || !title2 || !image || !btnText) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: title, title1, title2, image, btnText'
      });
    }

    const banner = await Banner.create({
      title,
      title1,
      title2,
      image,
      btnText,
      description1,
      description2
    });

    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: {
        banner
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating banner',
      error: error.message
    });
  }
});

// @desc    Update banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const bannerId = req.params.id;
    const { title, title1, title2, image, btnText, description1, description2 } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (title1) updateData.title1 = title1;
    if (title2) updateData.title2 = title2;
    if (image) updateData.image = image;
    if (btnText) updateData.btnText = btnText;
    if (description1 !== undefined) updateData.description1 = description1;
    if (description2 !== undefined) updateData.description2 = description2;

    const banner = await Banner.findByIdAndUpdate(
      bannerId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner updated successfully',
      data: {
        banner
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating banner',
      error: error.message
    });
  }
});

// @desc    Delete banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting banner',
      error: error.message
    });
  }
});

module.exports = router;
