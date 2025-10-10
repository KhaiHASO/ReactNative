import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsService } from '../../../services/productsApi';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const data = await productsService.getAll();
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error?.message as string) || 'Fetch failed';
      });
  },
});

export const productsReducer = productsSlice.reducer;


