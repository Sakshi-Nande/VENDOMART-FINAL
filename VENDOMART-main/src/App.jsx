import { Routes, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import Hero from './components/Hero.jsx';
import Vendor from './vendor.jsx';
import Supplier from './components/supplier.jsx';
import Auth from './components/Auth.jsx';
import Cart from './components/Cart.jsx';
import Payment from './components/Payment.jsx';
import { CartProvider } from './context/CartContext.jsx';
import OrderHistory from './components/OrderHistory.jsx';


import About from './components/About.jsx'; 

export default function App() {
  return (
    <CartProvider>
      <main>
        {/* Gradient image */}
        <img
          className="absolute top-0 right-0 opacity-60 -z-10"
          src="/gradient.png"
          alt="Gradient.png"
        />

        <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] -rotate-[30deg] -z-10">
        </div>

        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
        {/* Main content goes here */}
      </main>
    </CartProvider>
  );
}
