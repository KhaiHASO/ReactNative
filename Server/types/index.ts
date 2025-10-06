// Types for DineHub API responses

export interface ProductType {
  _id: string;
  name: string;
  weight?: number;
  calories?: number;
  price: number;
  old_price?: number;
  rating: number;
  image: string;
  images?: string[];
  sizes?: string[];
  size?: string;
  colors?: string[];
  color?: string;
  description?: string;
  categories?: string[];
  category?: string[];
  is_bestseller: boolean;
  is_featured: boolean;
  is_out_of_stock: boolean;
  is_new: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface TagType {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewType {
  _id: string;
  product_id: string;
  user_id?: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
  date: string;
}

export interface PromocodeType {
  _id: string;
  name: string;
  code: string;
  discount: number;
  expires_at: string;
  created_at: string;
}

export interface BannerType {
  _id: string;
  title: string;
  title1: string;
  title2: string;
  image: string;
  btnText: string;
  description1?: string;
  description2?: string;
  created_at: string;
}

export interface CarouselType {
  _id: string;
  title_line_1: string;
  title_line_2: string;
  image: string;
  button_text: string;
  created_at: string;
}

export interface UserType {
  _id: string;
  user_name?: string;
  email: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderType {
  _id: string;
  user_id: string;
  items: OrderItemType[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  shipping_address?: any;
  payment_method?: string;
  promocode_code?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItemType {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface NotificationType {
  _id: string;
  title: string;
  image?: string;
  description?: string;
  date: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ProductsResponse {
  products: ProductType[];
}

export interface CategoriesResponse {
  categories: CategoryType[];
}

export interface TagsResponse {
  tags: TagType[];
}

export interface BannersResponse {
  banners: BannerType[];
}

export interface CarouselResponse {
  carousel: CarouselType[];
}

export interface ReviewsResponse {
  reviews: ReviewType[];
}

export interface UsersResponse {
  users: UserType[];
}

export interface PromocodesResponse {
  promocodes: PromocodeType[];
}

// Auth Types
export interface LoginRequest {
  email: string;
  password_hash: string;
}

export interface RegisterRequest {
  user_name?: string;
  email: string;
  password_hash: string;
  phone_number?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: UserType;
    token: string;
  };
  message: string;
}

export interface CheckUserExistsRequest {
  user_name: string;
}

export interface CheckEmailExistsRequest {
  email: string;
}

export interface CheckExistsResponse {
  success: boolean;
  data: {
    exists: boolean;
  };
}
