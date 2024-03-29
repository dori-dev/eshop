import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Cart from "./components/checkout/cart";
import Shipping from "./components/checkout/shipping";
import Payment from "./components/checkout/payment";
import Order from "./components/checkout/order";
import OrderDetail from "./components/checkout/orderDetail";
import ProductDetail from "./components/products/detail";
import Login from "./components/account/login";
import Register from "./components/account/register";
import Profile from "./components/account/profile";
import Verify from "./components/account/verify";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/cart/:id?" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:id/" element={<OrderDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
