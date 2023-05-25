import { useState, useEffect } from "react";
import Products from "./products/products";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/v1/products/"
        );
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    return getData;
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">Latest Products</h1>
      <Products products={products} />
    </div>
  );
};

export default Home;
