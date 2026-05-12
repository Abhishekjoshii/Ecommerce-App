import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';
import Wishlist from './pages/Wishlist';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;