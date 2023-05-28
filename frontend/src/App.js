import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Login from "./components/auth/login";
import Cart from "./components/cart";
import ProductDetail from "./components/products/detail";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart/:id?" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
