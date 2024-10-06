// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; 
// import { addToCart } from '../slices/cartSlice';
// import { convertPrice, setExchangeRates } from '../slices/currencySlice'; 
// import CurrencySelector from '../components/CurrencySelector';
// import { formatPrice } from '../utils/formatPrice'; 
// import axios from 'axios';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const currency = useSelector((state) => state.currency.currency);
//   const exchangeRates = useSelector((state) => state.currency.exchangeRates); 

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://fakestoreapi.com/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchExchangeRates = async () => {
//       try {
//         const response = await axios.get('https://open.er-api.com/v6/latest/USD');
//         dispatch(setExchangeRates(response.data.rates)); // Update exchange rates in the store
//       } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//       }
//     };

//     fetchProducts();
//     fetchExchangeRates(); // Fetch exchange rates in the component
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-3xl font-bold mb-6">Products</h1>
//       <CurrencySelector />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg overflow-hidden">
//             <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold">{product.title}</h2>
//               <p className="text-gray-600">{product.description.substring(0, 100)}...</p>
              
//               <p className="text-lg font-bold">{formatPrice(convertPrice(product.price, currency, exchangeRates), currency)}</p>
//               <button
//                 onClick={() => dispatch(addToCart(product))}
//                 className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { convertPrice, setExchangeRates } from '../slices/currencySlice';
import CurrencySelector from '../components/CurrencySelector';
import { formatPrice } from '../utils/formatPrice';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For search and filter
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);
  const exchangeRates = useSelector((state) => state.currency.exchangeRates);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize with full product list
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://open.er-api.com/v6/latest/USD');
        dispatch(setExchangeRates(response.data.rates)); // Update exchange rates in the store
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchProducts();
    fetchExchangeRates();
  }, [dispatch]);

  useEffect(() => {
    // Filter products based on search term and category
    let updatedProducts = products;

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All') {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === category
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [searchTerm, category, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <CurrencySelector />

      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ml-4 border rounded px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.description.substring(0, 100)}...</p>
              <p className="text-lg font-bold">
                {formatPrice(convertPrice(product.price, currency, exchangeRates), currency)}
              </p>
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
