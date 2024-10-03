import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { addToCart } from '../slices/cartSlice';
import { convertPrice, fetchExchangeRates } from '../slices/currencySlice';
import CurrencySelector from '../components/CurrencySelector';
import { formatPrice } from '../utils/formatPrice'; 
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);
  const exchangeRates = useSelector((state) => state.currency.exchangeRates); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    dispatch(fetchExchangeRates()); 
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <CurrencySelector />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.description.substring(0, 100)}...</p>
              
              <p className="text-lg font-bold">{formatPrice(convertPrice(product.price, { currency, exchangeRates }), currency)}</p>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
