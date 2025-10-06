const express = require('express');
const Promocode = require('../models/Promocode');
const { protect } = require('../middleware/auth');
const { validatePromocode, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all discounts (promocodes)
// @route   GET /api/discount
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Only show active discounts for public
    if (!req.user) {
      filter.expires_at = { $gt: new Date() };
    }

    const promocodes = await Promocode.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Promocode.countDocuments(filter);

    res.json({
      success: true,
      data: {
        discounts: promocodes,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching discounts',
      error: error.message
    });
  }
});

// @desc    Get discount by ID
// @route   GET /api/discount/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const promocode = await Promocode.findById(req.params.id);

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    res.json({
      success: true,
      data: {
        discount: promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching discount',
      error: error.message
    });
  }
});

// @desc    Validate discount code
// @route   POST /api/discount/validate
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Discount code is required'
      });
    }

    const promocode = await Promocode.findOne({ 
      code: code.toUpperCase(),
      expires_at: { $gt: new Date() }
    });

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired discount code'
      });
    }

    res.json({
      success: true,
      message: 'Discount code is valid',
      data: {
        discount: {
          name: promocode.name,
          code: promocode.code,
          discount: promocode.discount,
          expires_at: promocode.expires_at
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while validating discount code',
      error: error.message
    });
  }
});

// @desc    Create new discount
// @route   POST /api/discount
// @access  Private/Admin
router.post('/', protect, validatePromocode, async (req, res) => {
  try {
    const { name, code, discount, expires_at } = req.body;

    // Check if discount already exists
    const existingPromocode = await Promocode.findOne({ code: code.toUpperCase() });
    if (existingPromocode) {
      return res.status(400).json({
        success: false,
        message: 'Discount code already exists'
      });
    }

    const promocode = await Promocode.create({
      name,
      code: code.toUpperCase(),
      discount,
      expires_at
    });

    res.status(201).json({
      success: true,
      message: 'Discount created successfully',
      data: {
        discount: promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating discount',
      error: error.message
    });
  }
});

// @desc    Update discount
// @route   PUT /api/discount/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const discountId = req.params.id;
    const { name, code, discount, expires_at } = req.body;

    // Check if code is being changed and if it already exists
    if (code) {
      const existingPromocode = await Promocode.findOne({ 
        code: code.toUpperCase(),
        _id: { $ne: discountId }
      });
      
      if (existingPromocode) {
        return res.status(400).json({
          success: false,
          message: 'Discount code already exists'
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (code) updateData.code = code.toUpperCase();
    if (discount !== undefined) updateData.discount = discount;
    if (expires_at) updateData.expires_at = expires_at;

    const promocode = await Promocode.findByIdAndUpdate(
      discountId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    res.json({
      success: true,
      message: 'Discount updated successfully',
      data: {
        discount: promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating discount',
      error: error.message
    });
  }
});

// @desc    Delete discount
// @route   DELETE /api/discount/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const promocode = await Promocode.findByIdAndDelete(req.params.id);

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Discount not found'
      });
    }

    res.json({
      success: true,
      message: 'Discount deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting discount',
      error: error.message
    });
  }
});

module.exports = router;
