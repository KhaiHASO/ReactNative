const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// User validation rules
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password_hash')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('user_name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters long'),
  body('phone_number')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
];

const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password_hash')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Product validation rules
const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters long'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('image')
    .notEmpty()
    .withMessage('Product image is required'),
  body('categories')
    .optional()
    .isArray()
    .withMessage('Categories must be an array'),
  handleValidationErrors
];

// Category validation rules
const validateCategory = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Category name must be at least 2 characters long'),
  body('image')
    .notEmpty()
    .withMessage('Category image is required'),
  handleValidationErrors
];

// Review validation rules
const validateReview = [
  body('product_id')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Reviewer name must be at least 2 characters long'),
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Comment must be between 10 and 500 characters'),
  handleValidationErrors
];

// Order validation rules
const validateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must have at least one item'),
  body('items.*.product_id')
    .isMongoId()
    .withMessage('Valid product ID is required for each item'),
  body('items.*.name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required for each item'),
  body('items.*.price')
    .isFloat({ min: 0 })
    .withMessage('Product price must be a positive number'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('subtotal')
    .isFloat({ min: 0 })
    .withMessage('Subtotal must be a positive number'),
  body('delivery')
    .isFloat({ min: 0 })
    .withMessage('Delivery fee must be a positive number'),
  body('total')
    .isFloat({ min: 0 })
    .withMessage('Total must be a positive number'),
  body('status')
    .optional()
    .isIn(['pending', 'paid', 'preparing', 'delivering', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
  handleValidationErrors
];

// Promocode validation rules
const validatePromocode = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Promocode name must be at least 2 characters long'),
  body('code')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Promocode must be at least 3 characters long'),
  body('discount')
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number'),
  body('expires_at')
    .isISO8601()
    .withMessage('Valid expiration date is required'),
  handleValidationErrors
];

// MongoDB ObjectId validation
const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Valid MongoDB ObjectId is required'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateProduct,
  validateCategory,
  validateReview,
  validateOrder,
  validatePromocode,
  validateObjectId
};
