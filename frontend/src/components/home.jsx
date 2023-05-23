import products from "../products";
import Products from "./products/products";

const Home = () => {
  return (
    <>
      <h1 className="mt-4 mb-3">Latest Products</h1>
      <Products products={products} />
    </>
  );
};

export default Home;
