import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; 
import RootLayout from './Layout/RootLayout'; // Import RootLayout that wraps routes with Navbar and Footer
import Home from './components/Home';
import Products from './components/Products';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // RootLayout includes Navbar, Footer, and the content
    children: [
      { index: true, element: <Home /> }, // Home route (default index)
      { path: 'products', element: <Products /> }, // Products route
      { path: 'blog', element: <Blog /> }, // Blog route
      { path: 'blog/:id', element: <BlogPost /> }, // Dynamic Blog Post route
      { path: 'contact', element: <Contact /> }, // Contact route
      { path: 'cart', element: <Cart /> }, // Cart route
      { path: '*', element: <NotFound /> }, // Fallback for 404
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} /> {/* Provide router to the app */}
    </Provider>
  );
};

export default App;
