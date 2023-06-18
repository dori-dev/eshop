import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Cart from "./components/cart";
import ProductDetail from "./components/products/detail";
import Login from "./components/account/login";
import Register from "./components/account/register";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart/:id?" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
