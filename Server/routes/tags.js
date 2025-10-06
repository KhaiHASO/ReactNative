const express = require('express');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');
const { validateCategory, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all tags (categories)
// @route   GET /api/tags
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const categories = await Category.find({})
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Category.countDocuments();

    res.json({
      tags: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tags',
      error: error.message
    });
  }
});

// @desc    Get tag by ID
// @route   GET /api/tags/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.json({
      success: true,
      data: {
        tag: category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tag',
      error: error.message
    });
  }
});

// @desc    Create new tag
// @route   POST /api/tags
// @access  Private/Admin
router.post('/', protect, validateCategory, async (req, res) => {
  try {
    const { name, image, quantity } = req.body;

    // Check if tag already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Tag already exists'
      });
    }

    const category = await Category.create({
      name,
      image,
      quantity: quantity || 0
    });

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      data: {
        tag: category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating tag',
      error: error.message
    });
  }
});

// @desc    Update tag
// @route   PUT /api/tags/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, validateCategory, async (req, res) => {
  try {
    const { name, image, quantity } = req.body;
    const categoryId = req.params.id;

    // Check if name is being changed and if it already exists
    if (name) {
      const existingCategory = await Category.findOne({ 
        name, 
        _id: { $ne: categoryId } 
      });
      
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Tag name already exists'
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (image) updateData.image = image;
    if (quantity !== undefined) updateData.quantity = quantity;

    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.json({
      success: true,
      message: 'Tag updated successfully',
      data: {
        tag: category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating tag',
      error: error.message
    });
  }
});

// @desc    Delete tag
// @route   DELETE /api/tags/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      });
    }

    res.json({
      success: true,
      message: 'Tag deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting tag',
      error: error.message
    });
  }
});

module.exports = router;
