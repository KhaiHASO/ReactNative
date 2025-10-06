import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL, AUTHORIZATION_TOKEN, ENDPOINTS} from './constants/endpoints';

import {
  ProductType,
  BannerType,
  CarouselType,
  TagType,
  CategoryType,
  PromocodeType,
  ReviewType,
  UserType,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  CheckUserExistsRequest,
  CheckEmailExistsRequest,
  CheckExistsResponse,
} from './types';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (AUTHORIZATION_TOKEN) {
        headers.set('authorization', `Bearer ${AUTHORIZATION_TOKEN}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Product', 'Category', 'Tag', 'Banner', 'Carousel', 'Review', 'User', 'Promocode'],
  endpoints: (builder) => ({
    // GET endpoints
    getProducts: builder.query<{products: ProductType[]}, void>({
      query: () => ENDPOINTS.get.products,
      providesTags: ['Product'],
    }),
    
    getBanners: builder.query<{banners: BannerType[]}, void>({
      query: () => ENDPOINTS.get.banners,
      providesTags: ['Banner'],
    }),
    
    getCarousel: builder.query<{carousel: CarouselType[]}, void>({
      query: () => ENDPOINTS.get.carousel,
      providesTags: ['Carousel'],
    }),
    
    getCategories: builder.query<{categories: CategoryType[]}, void>({
      query: () => ENDPOINTS.get.categories,
      providesTags: ['Category'],
    }),
    
    getReviews: builder.query<{reviews: ReviewType[]}, void>({
      query: () => ENDPOINTS.get.reviews,
      providesTags: ['Review'],
    }),
    
    getUsers: builder.query<{users: UserType[]}, void>({
      query: () => ENDPOINTS.get.users,
      providesTags: ['User'],
    }),
    
    getTags: builder.query<{tags: TagType[]}, void>({
      query: () => ENDPOINTS.get.tags,
      providesTags: ['Tag'],
    }),
    
    getPromocodes: builder.query<{promocodes: PromocodeType[]}, void>({
      query: () => ENDPOINTS.get.promocodes,
      providesTags: ['Promocode'],
    }),

    // POST endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: ENDPOINTS.post.login,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),

    createUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: ENDPOINTS.post.createUser,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    checkUserExists: builder.mutation<CheckExistsResponse, CheckUserExistsRequest>({
      query: (data) => ({
        url: ENDPOINTS.post.checkUserExists,
        method: 'POST',
        body: data,
      }),
    }),

    checkEmailExists: builder.mutation<CheckExistsResponse, CheckEmailExistsRequest>({
      query: (data) => ({
        url: ENDPOINTS.post.checkEmailExists,
        method: 'POST',
        body: data,
      }),
    }),

    // PUT endpoints
    updateUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: ENDPOINTS.put.updateUser,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetUsersQuery,
  useGetBannersQuery,
  useGetReviewsQuery,
  useGetProductsQuery,
  useGetCarouselQuery,
  useGetCategoriesQuery,
  useGetPromocodesQuery,
  useLoginMutation,
  useCreateUserMutation,
  useCheckUserExistsMutation,
  useCheckEmailExistsMutation,
  useUpdateUserMutation,
} = apiSlice;

export default apiSlice.reducer;
