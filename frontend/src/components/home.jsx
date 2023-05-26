import { useState, useEffect } from "react";
import Products from "./products/products";
import axios from "axios";
import ProductsSkeleton from "./skeleton/products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/");
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">Latest Products</h1>
      {products.length ? (
        <Products products={products} />
      ) : (
        <ProductsSkeleton />
      )}
    </div>
  );
};

export default Home;
