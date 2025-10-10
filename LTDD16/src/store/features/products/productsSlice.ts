import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsService } from '../../../services/productsApi';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  console.log('[fetchProducts] thunk start');
  const data = await productsService.getAll();
  console.log('[fetchProducts] thunk success, length:', Array.isArray((data as any)?.products) ? (data as any).products.length : 'n/a');
  return data; // expected: { products: [...] }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: null as any,
    loading: false,
    error: null as null | string,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('[productsSlice] pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('[productsSlice] fulfilled');
        state.loading = false;
        const payload: any = action.payload as any;
        let products: any[] = [];
        if (Array.isArray(payload)) {
          products = payload;
        } else if (Array.isArray(payload?.products)) {
          products = payload.products;
        } else if (Array.isArray(payload?.data)) {
          products = payload.data;
        } else if (Array.isArray(payload?.products?.docs)) {
          products = payload.products.docs;
        }
        console.log('[productsSlice] normalized products length:', products.length);
        state.data = { products } as any;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('[productsSlice] rejected', action.error?.message);
        state.loading = false;
        state.error = (action.error?.message as string) || 'Fetch failed';
      });
  },
});

export const productsReducer = productsSlice.reducer;


