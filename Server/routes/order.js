const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Promocode = require('../models/Promocode');
const { protect } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validation');

const router = express.Router();

// @desc    Create new order
// @route   POST /api/order/create
// @access  Private
router.post('/create', protect, validateOrder, async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shipping_address, payment_method, promocode_code } = req.body;

    // Validate all products exist and get their details
    const productIds = items.map(item => item.product_id);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more products not found'
      });
    }

    // Calculate subtotal
    let subtotal = 0;
    items.forEach(item => {
      const product = products.find(p => p._id.toString() === item.product_id.toString());
      if (product) {
        subtotal += item.price * item.quantity;
      }
    });

    // Calculate delivery fee (fixed for now)
    const delivery = 30000; // 30k VND

    // Calculate discount if promocode is provided
    let discount = 0;
    let validPromocode = null;
    if (promocode_code) {
      validPromocode = await Promocode.findOne({ 
        code: promocode_code.toUpperCase(),
        expires_at: { $gt: new Date() }
      });
      
      if (validPromocode) {
        discount = validPromocode.discount;
      }
    }

    // Calculate total
    const total = subtotal + delivery - discount;

    const order = await Order.create({
      user_id: userId,
      items,
      subtotal,
      delivery,
      discount,
      total,
      shipping_address,
      payment_method,
      promocode_code: promocode_code || null,
      status: 'pending'
    });

    // Populate the created order
    const populatedOrder = await Order.findById(order._id)
      .populate('items.product_id', 'name image');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: populatedOrder
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating order',
      error: error.message
    });
  }
});

module.exports = router;
