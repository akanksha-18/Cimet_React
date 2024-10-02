import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { formatPrice } = useCurrency();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0); 
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <CurrencySelector />
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">{formatPrice(item.price)}</p> {/* Use formatPrice */}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: {formatPrice(getTotalPrice())}</h2> 
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
