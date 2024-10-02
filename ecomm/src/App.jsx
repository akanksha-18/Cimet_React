import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './Layout/RootLayout';
import Home from './components/Home';
import Products from './components/Products';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
]);

const App = () => {
  return (
    <CurrencyProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </CurrencyProvider>
  );
};

export default App;