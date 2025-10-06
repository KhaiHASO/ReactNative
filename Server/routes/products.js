const express = require('express');
const Product = require('../models/Product');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateProduct, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all products with filtering and search
// @route   GET /api/products
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    
    if (req.query.category) {
      filter.category = { $in: req.query.category.split(',') };
    }
    
    if (req.query.featured === 'true') {
      filter.is_featured = true;
    }
    
    if (req.query.bestseller === 'true') {
      filter.is_bestseller = true;
    }
    
    if (req.query.new === 'true') {
      filter.is_new = true;
    }
    
    if (req.query.out_of_stock === 'true') {
      filter.is_out_of_stock = true;
    }
    
    if (req.query.min_price || req.query.max_price) {
      filter.price = {};
      if (req.query.min_price) filter.price.$gte = parseFloat(req.query.min_price);
      if (req.query.max_price) filter.price.$lte = parseFloat(req.query.max_price);
    }

    // Search functionality
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Sort options
    let sort = { created_at: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          sort = { price: 1 };
          break;
        case 'price_desc':
          sort = { price: -1 };
          break;
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'name':
          sort = { name: 1 };
          break;
        default:
          sort = { created_at: -1 };
      }
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await Product.countDocuments(filter);

    res.json({
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message
    });
  }
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', optionalAuth, validateObjectId, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message
    });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, validateProduct, async (req, res) => {
  try {
    const productData = req.body;

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message
    });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message
    });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message
    });
  }
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
router.get('/featured/all', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const products = await Product.find({ is_featured: true })
      .limit(limit)
      .sort({ created_at: -1 });

    res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured products',
      error: error.message
    });
  }
});

// @desc    Get bestseller products
// @route   GET /api/products/bestseller
// @access  Public
router.get('/bestseller/all', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const products = await Product.find({ is_bestseller: true })
      .limit(limit)
      .sort({ created_at: -1 });

    res.json({
      success: true,
      data: {
        products
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bestseller products',
      error: error.message
    });
  }
});

module.exports = router;
