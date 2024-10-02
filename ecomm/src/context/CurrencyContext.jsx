import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        setExchangeRates(response.data.rates);
        console.log('Exchange Rates:', response.data.rates); 
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertPrice = (priceInUSD) => {
    if (currency === 'USD') return priceInUSD; 
    if (!exchangeRates[currency]) return priceInUSD; 
    return (priceInUSD * exchangeRates[currency]).toFixed(2); 
  };

  const formatPrice = (priceInUSD) => {
    const convertedPrice = convertPrice(priceInUSD);
    const symbols = {
      'USD': '$',
      'INR': '₹',
      'AUD': 'A$'
    };
    return `${symbols[currency]}${convertedPrice}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};
