import { API } from '../constants/config';
import { httpGet } from './apiClient';

export type ProductsResponse = any; // keep lightweight as requested

export const productsService = {
  getAll: () => {
    console.log('[productsService] getAll ->', API.PRODUCTS);
    return httpGet<ProductsResponse>(API.PRODUCTS);
  },
};


