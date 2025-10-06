const express = require('express');
const User = require('../models/User');
const { protect, generateToken } = require('../middleware/auth');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');

const router = express.Router();

// @desc    Create new user
// @route   POST /api/auth/user/create
// @access  Public
router.post('/user/create', validateUserRegistration, async (req, res) => {
  try {
    const { email, password_hash, user_name, phone_number } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      email,
      password_hash,
      user_name,
      phone_number
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          user_name: user.user_name,
          phone_number: user.phone_number
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', validateUserLogin, async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password_hash');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          email: user.email,
          user_name: user.user_name,
          phone_number: user.phone_number
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/user/update
// @access  Private
router.put('/user/update', protect, async (req, res) => {
  try {
    const { user_name, phone_number } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (user_name) updateData.user_name = user_name;
    if (phone_number) updateData.phone_number = phone_number;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during profile update',
      error: error.message
    });
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const userId = req.user._id;

    if (!current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Get user with password
    const user = await User.findById(userId).select('+password_hash');
    
    // Check current password
    const isMatch = await user.comparePassword(current_password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password_hash = new_password;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during password change',
      error: error.message
    });
  }
});

// @desc    Check if user exists
// @route   POST /api/auth/user/exists
// @access  Public
router.post('/user/exists', async (req, res) => {
  try {
    const { user_name } = req.body;

    if (!user_name) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    const existingUser = await User.findOne({ user_name });
    
    res.json({
      success: true,
      data: {
        exists: !!existingUser
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while checking user existence',
      error: error.message
    });
  }
});

// @desc    Check if email exists
// @route   POST /api/auth/email/exists
// @access  Public
router.post('/email/exists', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const existingUser = await User.findOne({ email });
    
    res.json({
      success: true,
      data: {
        exists: !!existingUser
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while checking email existence',
      error: error.message
    });
  }
});

// @desc    Email verification
// @route   POST /api/auth/email/verify
// @access  Public
router.post('/email/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required'
      });
    }

    // In a real app, you would verify the code from your email service
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during email verification',
      error: error.message
    });
  }
});

// @desc    Email confirmation
// @route   POST /api/auth/email/confirm
// @access  Public
router.post('/email/confirm', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // In a real app, you would send confirmation email
    // For now, we'll just return success
    res.json({
      success: true,
      message: 'Confirmation email sent successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during email confirmation',
      error: error.message
    });
  }
});

module.exports = router;
