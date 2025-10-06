const express = require('express');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const notifications = await Notification.find({})
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const total = await Notification.countDocuments();

    res.json({
      success: true,
      data: {
        notifications,
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
      message: 'Server error while fetching notifications',
      error: error.message
    });
  }
});

// @desc    Get notification by ID
// @route   GET /api/notifications/:id
// @access  Public
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: {
        notification
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notification',
      error: error.message
    });
  }
});

// @desc    Create new notification
// @route   POST /api/notifications
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { title, image, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Notification title is required'
      });
    }

    const notification = await Notification.create({
      title,
      image,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: {
        notification
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating notification',
      error: error.message
    });
  }
});

// @desc    Update notification
// @route   PUT /api/notifications/:id
// @access  Private/Admin
router.put('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { title, image, description } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (image !== undefined) updateData.image = image;
    if (description !== undefined) updateData.description = description;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification updated successfully',
      data: {
        notification
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating notification',
      error: error.message
    });
  }
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
router.delete('/:id', protect, validateObjectId, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting notification',
      error: error.message
    });
  }
});

module.exports = router;
