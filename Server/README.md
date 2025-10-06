# DineHub Food Delivery Backend

Backend API server cho ứng dụng giao đồ ăn DineHub, được xây dựng với Node.js, Express.js và MongoDB.

## 🚀 Tính năng

- **Authentication & Authorization**: JWT-based authentication
- **User Management**: Đăng ký, đăng nhập, quản lý profile
- **Product Management**: CRUD operations cho sản phẩm
- **Category Management**: Quản lý danh mục sản phẩm
- **Order Management**: Xử lý đơn hàng với các trạng thái khác nhau
- **Review System**: Hệ thống đánh giá sản phẩm
- **Promocode System**: Hệ thống mã giảm giá
- **Notification System**: Thông báo cho người dùng
- **Image Upload**: Upload hình ảnh cho sản phẩm, danh mục, banner
- **Search & Filter**: Tìm kiếm và lọc sản phẩm
- **Rate Limiting**: Giới hạn số lượng request
- **Data Validation**: Validation đầu vào với express-validator

## 📋 Yêu cầu hệ thống

- Node.js >= 14.0.0
- MongoDB >= 4.4
- npm hoặc yarn

## 🛠️ Cài đặt

1. **Clone repository và cài đặt dependencies:**
```bash
npm install
```

2. **Tạo file .env từ template:**
```bash
cp env.example .env
```

3. **Cấu hình file .env:**
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dinehub

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. **Khởi động MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. **Chạy server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

6. **Tạo sample data (tùy chọn):**
```bash
npm run seed
```

## 📁 Cấu trúc thư mục

```
be/
├── config/
│   └── database.js          # Cấu hình kết nối MongoDB
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── errorHandler.js     # Global error handler
│   ├── upload.js           # File upload middleware
│   └── validation.js       # Input validation middleware
├── models/
│   ├── User.js             # User model
│   ├── Category.js         # Category model
│   ├── Product.js          # Product model
│   ├── Review.js           # Review model
│   ├── Order.js            # Order model
│   ├── Promocode.js        # Promocode model
│   ├── Notification.js     # Notification model
│   ├── Carousel.js         # Carousel model
│   └── Banner.js           # Banner model
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── users.js            # User management routes
│   ├── categories.js       # Category routes
│   ├── products.js         # Product routes
│   ├── reviews.js          # Review routes
│   ├── orders.js           # Order routes
│   ├── promocodes.js       # Promocode routes
│   ├── notifications.js    # Notification routes
│   ├── carousels.js        # Carousel routes
│   ├── banners.js          # Banner routes
│   └── uploads.js          # File upload routes
├── scripts/
│   └── seedData.js         # Sample data seeding script
├── uploads/                # Thư mục chứa hình ảnh
├── app.js                  # Main server file
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/user/create` - Tạo tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/user/update` - Cập nhật profile
- `PUT /api/auth/change-password` - Đổi mật khẩu
- `POST /api/auth/user/exists` - Kiểm tra username đã tồn tại
- `POST /api/auth/email/exists` - Kiểm tra email đã tồn tại
- `POST /api/auth/email/verify` - Xác thực email
- `POST /api/auth/email/confirm` - Gửi email xác nhận

### Users
- `GET /api/users` - Lấy danh sách users (Admin)
- `GET /api/users/:id` - Lấy thông tin user theo ID
- `PUT /api/users/:id` - Cập nhật user (Admin)
- `DELETE /api/users/:id` - Xóa user (Admin)

### Categories
- `GET /api/categories` - Lấy danh sách categories
- `GET /api/categories/:id` - Lấy category theo ID
- `POST /api/categories` - Tạo category mới (Admin)
- `PUT /api/categories/:id` - Cập nhật category (Admin)
- `DELETE /api/categories/:id` - Xóa category (Admin)

### Products
- `GET /api/products` - Lấy danh sách products (có filter, search, pagination)
- `GET /api/products/:id` - Lấy product theo ID
- `GET /api/products/featured/all` - Lấy featured products
- `GET /api/products/bestseller/all` - Lấy bestseller products
- `POST /api/products` - Tạo product mới (Admin)
- `PUT /api/products/:id` - Cập nhật product (Admin)
- `DELETE /api/products/:id` - Xóa product (Admin)

### Reviews
- `GET /api/reviews` - Lấy danh sách reviews (Admin)
- `GET /api/reviews/product/:productId` - Lấy reviews của product
- `GET /api/reviews/:id` - Lấy review theo ID
- `POST /api/reviews` - Tạo review mới (Auth required)
- `PUT /api/reviews/:id` - Cập nhật review (Owner/Admin)
- `DELETE /api/reviews/:id` - Xóa review (Owner/Admin)

### Orders
- `GET /api/orders` - Lấy orders của user hiện tại
- `GET /api/orders/admin` - Lấy tất cả orders (Admin)
- `GET /api/orders/:id` - Lấy order theo ID
- `POST /api/order/create` - Tạo order mới
- `POST /api/orders` - Tạo order mới (alternative)
- `PUT /api/orders/:id/status` - Cập nhật trạng thái order (Admin)
- `PUT /api/orders/:id/cancel` - Hủy order
- `DELETE /api/orders/:id` - Xóa order (Admin)

### Promocodes & Discounts
- `GET /api/promocodes` - Lấy danh sách promocodes
- `GET /api/promocode` - Lấy danh sách promocodes (alternative)
- `GET /api/discount` - Lấy danh sách discounts
- `GET /api/promocodes/:id` - Lấy promocode theo ID
- `POST /api/promocodes/validate` - Validate promocode
- `POST /api/discount/validate` - Validate discount code
- `POST /api/promocodes` - Tạo promocode mới (Admin)
- `POST /api/discount` - Tạo discount mới (Admin)
- `PUT /api/promocodes/:id` - Cập nhật promocode (Admin)
- `PUT /api/discount/:id` - Cập nhật discount (Admin)
- `DELETE /api/promocodes/:id` - Xóa promocode (Admin)
- `DELETE /api/discount/:id` - Xóa discount (Admin)

### Notifications
- `GET /api/notifications` - Lấy danh sách notifications
- `GET /api/notifications/:id` - Lấy notification theo ID
- `POST /api/notifications` - Tạo notification mới (Admin)
- `PUT /api/notifications/:id` - Cập nhật notification (Admin)
- `DELETE /api/notifications/:id` - Xóa notification (Admin)

### Carousels & Slides
- `GET /api/carousels` - Lấy danh sách carousels
- `GET /api/slides` - Lấy danh sách slides (carousels)
- `GET /api/carousels/:id` - Lấy carousel theo ID
- `POST /api/carousels` - Tạo carousel mới (Admin)
- `PUT /api/carousels/:id` - Cập nhật carousel (Admin)
- `DELETE /api/carousels/:id` - Xóa carousel (Admin)

### Tags
- `GET /api/tags` - Lấy danh sách tags (categories)
- `GET /api/tags/:id` - Lấy tag theo ID
- `POST /api/tags` - Tạo tag mới (Admin)
- `PUT /api/tags/:id` - Cập nhật tag (Admin)
- `DELETE /api/tags/:id` - Xóa tag (Admin)

### Banners
- `GET /api/banners` - Lấy danh sách banners
- `GET /api/banners/:id` - Lấy banner theo ID
- `POST /api/banners` - Tạo banner mới (Admin)
- `PUT /api/banners/:id` - Cập nhật banner (Admin)
- `DELETE /api/banners/:id` - Xóa banner (Admin)

### File Upload
- `POST /api/upload/image` - Upload 1 hình ảnh (Admin)
- `POST /api/upload/images` - Upload nhiều hình ảnh (Admin)
- `POST /api/upload/product-images` - Upload hình sản phẩm (Admin)
- `POST /api/upload/category-image` - Upload hình danh mục (Admin)
- `POST /api/upload/banner-image` - Upload hình banner (Admin)

### Health Check
- `GET /health` - Kiểm tra trạng thái server

## 🔐 Authentication

API sử dụng JWT (JSON Web Token) cho authentication. Để truy cập các protected routes, bạn cần:

1. Đăng nhập để lấy token
2. Gửi token trong header: `Authorization: Bearer <your_token>`

## 📊 Sample Data

Sau khi chạy `npm run seed`, bạn sẽ có:

- **3 users** (bao gồm admin account)
- **6 categories** (Pizza, Burger, Pasta, Salad, Dessert, Drinks)
- **6 products** với đầy đủ thông tin
- **5 reviews** cho các sản phẩm
- **3 promocodes** active
- **3 notifications**
- **3 carousels**
- **2 banners**

### Test Credentials:
- **Email**: admin@dinehub.com
- **Password**: 123456

## 🖼️ Hình ảnh

Thư mục `uploads/` đã được tạo sẵn. Bạn có thể:

1. Copy hình ảnh vào thư mục này
2. Sử dụng API upload để upload hình ảnh
3. Cập nhật đường dẫn hình ảnh trong database

## 🔧 Development

```bash
# Chạy với nodemon (auto-reload)
npm run dev

# Chạy seeding data
npm run seed

# Chạy production
npm start
```

## 📋 ENDPOINTS Constants

File `constants/endpoints.js` chứa tất cả endpoints được định nghĩa sẵn:

```javascript
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
```

Sử dụng trong React Native:
```javascript
import { ENDPOINTS } from './constants/endpoints';

// GET requests
fetch(`/api/${ENDPOINTS.get.products}`)
fetch(`/api/${ENDPOINTS.get.carousel}`)

// POST requests
fetch(`/api/${ENDPOINTS.post.order}`, { method: 'POST' })

// Auth requests
fetch(`/api/${ENDPOINTS.auth.login}`, { method: 'POST' })
```

## 📝 Ghi chú

- Server sẽ chạy trên port 3000 (có thể thay đổi trong .env)
- MongoDB connection string có thể là local hoặc cloud (MongoDB Atlas)
- File upload giới hạn 5MB per file
- Rate limiting: 100 requests per 15 minutes per IP
- Tất cả timestamps đều sử dụng UTC

## 🚀 Production Deployment

1. Cập nhật NODE_ENV=production trong .env
2. Sử dụng MongoDB Atlas hoặc production MongoDB
3. Cấu hình JWT_SECRET mạnh
4. Sử dụng PM2 hoặc Docker để deploy
5. Cấu hình reverse proxy (Nginx) nếu cần

## 📞 Support

Nếu có vấn đề gì, hãy kiểm tra:
1. MongoDB đã chạy chưa
2. Port 3000 có bị chiếm không
3. File .env đã được cấu hình đúng chưa
4. Dependencies đã được cài đặt đầy đủ chưa
