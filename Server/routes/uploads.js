const express = require('express');
const { upload, handleUploadError } = require('../middleware/upload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/upload/image
// @access  Private/Admin
router.post('/image', protect, upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while uploading image',
      error: error.message
    });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/images
// @access  Private/Admin
router.post('/images', protect, upload.array('images', 10), handleUploadError, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`
    }));

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        files: uploadedFiles,
        count: uploadedFiles.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while uploading images',
      error: error.message
    });
  }
});

// @desc    Upload product images
// @route   POST /api/upload/product-images
// @access  Private/Admin
router.post('/product-images', protect, upload.fields([
  { name: 'main_image', maxCount: 1 },
  { name: 'additional_images', maxCount: 9 }
]), handleUploadError, (req, res) => {
  try {
    const files = req.files;
    const result = {};

    if (files.main_image && files.main_image.length > 0) {
      result.main_image = {
        filename: files.main_image[0].filename,
        originalname: files.main_image[0].originalname,
        url: `/uploads/${files.main_image[0].filename}`
      };
    }

    if (files.additional_images && files.additional_images.length > 0) {
      result.additional_images = files.additional_images.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        url: `/uploads/${file.filename}`
      }));
    }

    if (!result.main_image && !result.additional_images) {
      return res.status(400).json({
        success: false,
        message: 'No image files provided'
      });
    }

    res.json({
      success: true,
      message: 'Product images uploaded successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while uploading product images',
      error: error.message
    });
  }
});

// @desc    Upload category image
// @route   POST /api/upload/category-image
// @access  Private/Admin
router.post('/category-image', protect, upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    res.json({
      success: true,
      message: 'Category image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while uploading category image',
      error: error.message
    });
  }
});

// @desc    Upload banner/carousel image
// @route   POST /api/upload/banner-image
// @access  Private/Admin
router.post('/banner-image', protect, upload.single('image'), handleUploadError, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    res.json({
      success: true,
      message: 'Banner image uploaded successfully',
      data: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while uploading banner image',
      error: error.message
    });
  }
});

module.exports = router;
