import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';
import { convertPrice } from '../slices/currencySlice'; 
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const currency = useSelector((state) => state.currency.currency); 
  const exchangeRates = useSelector((state) => state.currency.exchangeRates); 

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + convertPrice(item.price * item.quantity, { currency, exchangeRates }), 0);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  
                  <p className="text-gray-600">{formatPrice(convertPrice(item.price, { currency, exchangeRates }), currency)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: -1 }))}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: 1 }))}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
    
            <h2 className="text-2xl font-bold">Total: {formatPrice(getTotalPrice(), currency)}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
