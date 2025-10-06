require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Review = require('../models/Review');
const Promocode = require('../models/Promocode');
const Notification = require('../models/Notification');
const Carousel = require('../models/Carousel');
const Banner = require('../models/Banner');

// Connect to database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dinehub';
    await mongoose.connect(mongoURI);
    console.log('📊 Connected to MongoDB');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Sample data
const sampleUsers = [
  {
    user_name: 'Admin User',
    email: 'admin@dinehub.com',
    password_hash: '123456',
    phone_number: '0123456789'
  },
  {
    user_name: 'John Doe',
    email: 'john@example.com',
    password_hash: '123456',
    phone_number: '0987654321'
  },
  {
    user_name: 'Jane Smith',
    email: 'jane@example.com',
    password_hash: '123456',
    phone_number: '0555666777'
  }
];

const sampleCategories = [
  {
    name: 'Pizza',
    image: '/uploads/category-pizza.jpg',
    quantity: 15
  },
  {
    name: 'Burger',
    image: '/uploads/category-burger.jpg',
    quantity: 12
  },
  {
    name: 'Pasta',
    image: '/uploads/category-pasta.jpg',
    quantity: 8
  },
  {
    name: 'Salad',
    image: '/uploads/category-salad.jpg',
    quantity: 10
  },
  {
    name: 'Dessert',
    image: '/uploads/category-dessert.jpg',
    quantity: 6
  },
  {
    name: 'Drinks',
    image: '/uploads/category-drinks.jpg',
    quantity: 20
  }
];

const sampleProducts = [
  {
    name: 'Margherita Pizza',
    weight: 350,
    calories: 850,
    price: 150000,
    old_price: 180000,
    rating: 4.5,
    image: '/uploads/margherita-pizza.jpg',
    images: ['/uploads/margherita-pizza-1.jpg', '/uploads/margherita-pizza-2.jpg'],
    sizes: ['S', 'M', 'L'],
    colors: ['Red', 'White'],
    description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
    categories: ['Pizza'],
    category: ['Pizza'],
    is_bestseller: true,
    is_featured: true,
    is_out_of_stock: false,
    is_new: false
  },
  {
    name: 'Cheeseburger Deluxe',
    weight: 280,
    calories: 720,
    price: 120000,
    old_price: 140000,
    rating: 4.3,
    image: '/uploads/cheeseburger-deluxe.jpg',
    images: ['/uploads/cheeseburger-deluxe-1.jpg'],
    sizes: ['Regular', 'Large'],
    colors: ['Brown'],
    description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
    categories: ['Burger'],
    category: ['Burger'],
    is_bestseller: true,
    is_featured: false,
    is_out_of_stock: false,
    is_new: true
  },
  {
    name: 'Spaghetti Carbonara',
    weight: 300,
    calories: 680,
    price: 130000,
    rating: 4.4,
    image: '/uploads/spaghetti-carbonara.jpg',
    images: ['/uploads/spaghetti-carbonara-1.jpg'],
    sizes: ['Regular', 'Large'],
    description: 'Traditional Italian pasta with eggs, cheese, pancetta, and black pepper',
    categories: ['Pasta'],
    category: ['Pasta'],
    is_bestseller: false,
    is_featured: true,
    is_out_of_stock: false,
    is_new: false
  },
  {
    name: 'Caesar Salad',
    weight: 200,
    calories: 320,
    price: 80000,
    rating: 4.2,
    image: '/uploads/caesar-salad.jpg',
    images: ['/uploads/caesar-salad-1.jpg'],
    sizes: ['Regular', 'Large'],
    description: 'Fresh romaine lettuce with parmesan cheese, croutons, and caesar dressing',
    categories: ['Salad'],
    category: ['Salad'],
    is_bestseller: false,
    is_featured: false,
    is_out_of_stock: false,
    is_new: true
  },
  {
    name: 'Chocolate Lava Cake',
    weight: 150,
    calories: 480,
    price: 90000,
    rating: 4.7,
    image: '/uploads/chocolate-lava-cake.jpg',
    images: ['/uploads/chocolate-lava-cake-1.jpg'],
    sizes: ['Regular'],
    description: 'Warm chocolate cake with molten chocolate center, served with vanilla ice cream',
    categories: ['Dessert'],
    category: ['Dessert'],
    is_bestseller: true,
    is_featured: true,
    is_out_of_stock: false,
    is_new: false
  },
  {
    name: 'Fresh Orange Juice',
    weight: 250,
    calories: 120,
    price: 35000,
    rating: 4.0,
    image: '/uploads/fresh-orange-juice.jpg',
    images: ['/uploads/fresh-orange-juice-1.jpg'],
    sizes: ['Regular', 'Large'],
    description: 'Freshly squeezed orange juice, no added sugar',
    categories: ['Drinks'],
    category: ['Drinks'],
    is_bestseller: false,
    is_featured: false,
    is_out_of_stock: false,
    is_new: false
  }
];

const sampleReviews = [
  {
    name: 'John Doe',
    rating: 5,
    comment: 'Absolutely delicious! The pizza was perfectly cooked and the ingredients were fresh.',
    image: '/uploads/review-1.jpg'
  },
  {
    name: 'Jane Smith',
    rating: 4,
    comment: 'Great burger, but the fries could be better. Overall good experience.',
    image: '/uploads/review-2.jpg'
  },
  {
    name: 'Mike Johnson',
    rating: 5,
    comment: 'Best carbonara I\'ve had outside of Italy! Highly recommended.',
    image: '/uploads/review-3.jpg'
  },
  {
    name: 'Sarah Wilson',
    rating: 4,
    comment: 'Fresh salad with great dressing. Perfect for a light lunch.',
    image: '/uploads/review-4.jpg'
  },
  {
    name: 'David Brown',
    rating: 5,
    comment: 'Amazing dessert! The chocolate lava cake was perfect.',
    image: '/uploads/review-5.jpg'
  }
];

const samplePromocodes = [
  {
    name: 'Welcome Discount',
    code: 'WELCOME20',
    discount: 20000,
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    name: 'Weekend Special',
    code: 'WEEKEND15',
    discount: 15000,
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  {
    name: 'First Order',
    code: 'FIRST10',
    discount: 10000,
    expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  }
];

const sampleNotifications = [
  {
    title: 'New Menu Items Available!',
    image: '/uploads/notification-1.jpg',
    description: 'Check out our latest additions to the menu including seasonal specials.',
    date: new Date()
  },
  {
    title: 'Free Delivery Weekend',
    image: '/uploads/notification-2.jpg',
    description: 'Enjoy free delivery on all orders this weekend. No minimum order required!',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    title: 'Special Offer: 20% Off Pizzas',
    image: '/uploads/notification-3.jpg',
    description: 'Get 20% off on all pizza orders. Use code PIZZA20 at checkout.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  }
];

const sampleCarousels = [
  {
    title_line_1: 'Delicious Food',
    title_line_2: 'Delivered Fast',
    image: '/uploads/carousel-1.jpg',
    button_text: 'Order Now'
  },
  {
    title_line_1: 'Fresh Ingredients',
    title_line_2: 'Every Day',
    image: '/uploads/carousel-2.jpg',
    button_text: 'Explore Menu'
  },
  {
    title_line_1: 'Special Offers',
    title_line_2: 'Limited Time',
    image: '/uploads/carousel-3.jpg',
    button_text: 'Get Deals'
  }
];

const sampleBanners = [
  {
    title: 'Weekend Special',
    title1: '50% Off',
    title2: 'All Pizzas',
    image: '/uploads/banner-1.jpg',
    btnText: 'Order Now',
    description1: 'Limited time offer',
    description2: 'This weekend only'
  },
  {
    title: 'New Menu',
    title1: 'Try Our',
    title2: 'New Dishes',
    image: '/uploads/banner-2.jpg',
    btnText: 'Explore',
    description1: 'Fresh ingredients',
    description2: 'Amazing flavors'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Promocode.deleteMany({});
    await Notification.deleteMany({});
    await Carousel.deleteMany({});
    await Banner.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create(sampleUsers);
    console.log(`👥 Created ${users.length} users`);

    // Create categories
    const categories = await Category.create(sampleCategories);
    console.log(`📂 Created ${categories.length} categories`);

    // Create products
    const products = await Product.create(sampleProducts);
    console.log(`🍕 Created ${products.length} products`);

    // Create reviews for products
    const reviews = [];
    for (let i = 0; i < sampleReviews.length; i++) {
      const review = sampleReviews[i];
      const productIndex = i % products.length;
      reviews.push({
        ...review,
        product_id: products[productIndex]._id,
        user_id: users[0]._id
      });
    }
    await Review.create(reviews);
    console.log(`⭐ Created ${reviews.length} reviews`);

    // Create promocodes
    await Promocode.create(samplePromocodes);
    console.log(`🎫 Created ${samplePromocodes.length} promocodes`);

    // Create notifications
    await Notification.create(sampleNotifications);
    console.log(`🔔 Created ${sampleNotifications.length} notifications`);

    // Create carousels
    await Carousel.create(sampleCarousels);
    console.log(`🎠 Created ${sampleCarousels.length} carousels`);

    // Create banners
    await Banner.create(sampleBanners);
    console.log(`🖼️  Created ${sampleBanners.length} banners`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📋 Sample Data Summary:');
    console.log(`👥 Users: ${users.length}`);
    console.log(`📂 Categories: ${categories.length}`);
    console.log(`🍕 Products: ${products.length}`);
    console.log(`⭐ Reviews: ${reviews.length}`);
    console.log(`🎫 Promocodes: ${samplePromocodes.length}`);
    console.log(`🔔 Notifications: ${sampleNotifications.length}`);
    console.log(`🎠 Carousels: ${sampleCarousels.length}`);
    console.log(`🖼️  Banners: ${sampleBanners.length}`);
    
    console.log('\n🔑 Test Credentials:');
    console.log('Email: admin@dinehub.com');
    console.log('Password: 123456');
    console.log('\n📱 API Endpoints:');
    console.log('Health Check: GET /health');
    console.log('Login: POST /api/auth/login');
    console.log('Products: GET /api/products');
    console.log('Categories: GET /api/categories');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();
