import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice'; 
import currencyReducer from '../slices/currencySlice'; 

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    currency: currencyReducer,
  },
});

export default store;
