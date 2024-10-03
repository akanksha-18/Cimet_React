import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExchangeRates = createAsyncThunk(
  'currency/fetchExchangeRates',
  async () => {
    const response = await axios.get('https://open.er-api.com/v6/latest/USD');
    return response.data.rates;
  }
);

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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRates.fulfilled, (state, action) => {
      state.exchangeRates = action.payload;
    });
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;

export const convertPrice = (priceInUSD, { currency, exchangeRates }) => {
  if (currency === 'USD') return priceInUSD;
  if (!exchangeRates[currency]) return priceInUSD;
  return (priceInUSD * exchangeRates[currency]).toFixed(2);
};
