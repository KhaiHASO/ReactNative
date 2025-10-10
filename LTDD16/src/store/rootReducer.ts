import { combineReducers } from '@reduxjs/toolkit';
import { productsReducer } from './features/products/productsSlice';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


