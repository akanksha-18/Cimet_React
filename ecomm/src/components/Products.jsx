import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <CurrencySelector />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{formatPrice(product.price)}</p> 
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
