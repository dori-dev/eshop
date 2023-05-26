import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products/products";
import ProductsSkeleton from "./skeleton/products";
import { fetchProducts } from "../actions/productActions";
import Message from "./message";

const Home = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.listProduct
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">Latest Products</h1>
      {loading ? (
        <ProductsSkeleton />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <Products products={products} />
      )}
    </div>
  );
};

export default Home;
