const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Promocode = require('../models/Promocode');
const { protect } = require('../middleware/auth');
const { validateOrder, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all orders for a user
// @route   GET /api/orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user_id: userId };
    
    // Filter by status if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate('items.product_id', 'name image')
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
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
      message: 'Server error while fetching orders',
      error: error.message
    });
  }
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin
// @access  Private/Admin
router.get('/admin', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    
    // Filter by status if provided
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Filter by user if provided
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }

    const orders = await Order.find(filter)
      .populate('user_id', 'user_name email phone_number')
      .populate('items.product_id', 'name image')
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });

    const total = await Order.countDocuments(filter);

    res.json({
      success: true,
      data: {
        orders,
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
      message: 'Server error while fetching orders',
      error: error.message
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findById(orderId)
      .populate('user_id', 'user_name email phone_number')
      .populate('items.product_id', 'name image');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user_id._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: {
        order
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order',
      error: error.message
    });
  }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post('/', protect, validateOrder, async (req, res) => {
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

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, validateObjectId, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!['pending', 'paid', 'preparing', 'delivering', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate('user_id', 'user_name email phone_number')
     .populate('items.product_id', 'name image');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: {
        order
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status',
      error: error.message
    });
  }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
router.put('/:id/cancel', protect, validateObjectId, async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user._id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user_id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (!['pending', 'paid'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: 'cancelled' },
      { new: true, runValidators: true }
    ).populate('items.product_id', 'name image');

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: {
        order: updatedOrder
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling order',
      error: error.message
    });
  }
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting order',
      error: error.message
    });
  }
});

module.exports = router;
