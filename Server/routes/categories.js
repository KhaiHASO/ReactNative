const express = require('express');
const Category = require('../models/Category');
const { protect } = require('../middleware/auth');
const { validateCategory, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all categories
// @route   GET /api/categories
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
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message
    });
  }
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: {
        category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching category',
      error: error.message
    });
  }
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
router.post('/', protect, validateCategory, async (req, res) => {
  try {
    const { name, image, quantity } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }

    const category = await Category.create({
      name,
      image,
      quantity: quantity || 0
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating category',
      error: error.message
    });
  }
});

// @desc    Update category
// @route   PUT /api/categories/:id
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
          message: 'Category name already exists'
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
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: {
        category
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating category',
      error: error.message
    });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category',
      error: error.message
    });
  }
});

module.exports = router;
