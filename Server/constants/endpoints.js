export const ENDPOINTS = {
  get: {
    tags: 'api/tags',
    users: 'api/users',
    orders: 'api/orders',
    carousel: 'api/slides',
    banners: 'api/banners',
    reviews: 'api/reviews',
    discount: 'api/discount',
    products: 'api/products',
    promocode: 'api/promocode',
    promocodes: 'api/promocodes',
    categories: 'api/categories',
  },
  post: {
    order: 'api/order/create',
    login: 'api/auth/login',
    createUser: 'api/auth/user/create',
    checkUserExists: 'api/auth/user/exists',
    checkEmailExists: 'api/auth/email/exists',
    emailVerify: 'api/auth/email/verify',
    emailConfirm: 'api/auth/email/confirm',
  },
  put: {
    updateUser: 'api/auth/user/update',
  },
  auth: {
    login: 'api/auth/login',
    updateUser: 'api/auth/user/update',
    emailVerify: 'api/auth/email/verify',
    createNewUser: 'api/auth/user/create',
    ifUserExists: 'api/auth/user/exists',
    ifEmailExists: 'api/auth/email/exists',
    emailConfirm: 'api/auth/email/confirm',
  },
};

// For CommonJS compatibility
module.exports = { ENDPOINTS };
