const express = require('express');
const Promocode = require('../models/Promocode');
const { protect } = require('../middleware/auth');
const { validatePromocode, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all promocodes
// @route   GET /api/promocode
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Only show active promocodes for public
    if (!req.user) {
      filter.expires_at = { $gt: new Date() };
    }

    const promocodes = await Promocode.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Promocode.countDocuments(filter);

    res.json({
      promocodes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching promocodes',
      error: error.message
    });
  }
});

// @desc    Get promocode by ID
// @route   GET /api/promocodes/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const promocode = await Promocode.findById(req.params.id);

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Promocode not found'
      });
    }

    res.json({
      success: true,
      data: {
        promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching promocode',
      error: error.message
    });
  }
});

// @desc    Validate promocode
// @route   POST /api/promocodes/validate
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Promocode is required'
      });
    }

    const promocode = await Promocode.findOne({ 
      code: code.toUpperCase(),
      expires_at: { $gt: new Date() }
    });

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired promocode'
      });
    }

    res.json({
      success: true,
      message: 'Promocode is valid',
      data: {
        promocode: {
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
      message: 'Server error while validating promocode',
      error: error.message
    });
  }
});

// @desc    Create new promocode
// @route   POST /api/promocodes
// @access  Private/Admin
router.post('/', protect, validatePromocode, async (req, res) => {
  try {
    const { name, code, discount, expires_at } = req.body;

    // Check if promocode already exists
    const existingPromocode = await Promocode.findOne({ code: code.toUpperCase() });
    if (existingPromocode) {
      return res.status(400).json({
        success: false,
        message: 'Promocode already exists'
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
      message: 'Promocode created successfully',
      data: {
        promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating promocode',
      error: error.message
    });
  }
});

// @desc    Update promocode
// @route   PUT /api/promocodes/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const promocodeId = req.params.id;
    const { name, code, discount, expires_at } = req.body;

    // Check if code is being changed and if it already exists
    if (code) {
      const existingPromocode = await Promocode.findOne({ 
        code: code.toUpperCase(),
        _id: { $ne: promocodeId }
      });
      
      if (existingPromocode) {
        return res.status(400).json({
          success: false,
          message: 'Promocode already exists'
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (code) updateData.code = code.toUpperCase();
    if (discount !== undefined) updateData.discount = discount;
    if (expires_at) updateData.expires_at = expires_at;

    const promocode = await Promocode.findByIdAndUpdate(
      promocodeId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Promocode not found'
      });
    }

    res.json({
      success: true,
      message: 'Promocode updated successfully',
      data: {
        promocode
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating promocode',
      error: error.message
    });
  }
});

// @desc    Delete promocode
// @route   DELETE /api/promocodes/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const promocode = await Promocode.findByIdAndDelete(req.params.id);

    if (!promocode) {
      return res.status(404).json({
        success: false,
        message: 'Promocode not found'
      });
    }

    res.json({
      success: true,
      message: 'Promocode deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting promocode',
      error: error.message
    });
  }
});

module.exports = router;
