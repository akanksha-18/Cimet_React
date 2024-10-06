import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currency: 'USD',
  exchangeRates: {},
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setExchangeRates: (state, action) => {
      state.exchangeRates = action.payload;
    },
  },
});

export const { setCurrency, setExchangeRates } = currencySlice.actions;
export default currencySlice.reducer;

// Conversion function
export const convertPrice = (priceInUSD, currency = 'USD', exchangeRates = {}) => {
  if (currency === 'USD') return priceInUSD;
  if (!exchangeRates[currency]) return priceInUSD;
  return (priceInUSD * exchangeRates[currency]).toFixed(2);
};
