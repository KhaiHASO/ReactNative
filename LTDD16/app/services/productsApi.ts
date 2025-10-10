import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Handle different host environments (Android emulator, iOS sim, web)
function resolveBaseUrl(): string {
  const defaultUrl = 'http://localhost:3000';
  // On Android emulator, localhost refers to the device. Use 10.0.2.2
  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '')) {
    return 'http://10.0.2.2:3000';
  }
  return defaultUrl;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: resolveBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Loosen typing to align with preferred lightweight pattern
    getProducts: builder.query<any, void>({
      query: () => '/api/products',
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;


