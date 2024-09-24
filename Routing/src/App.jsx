import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />}>
            <Route path=':id' element={<ProductDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
