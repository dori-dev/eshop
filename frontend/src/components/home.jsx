import products from "../products";
import Products from "./products/products";

const Home = () => {
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">Latest Products</h1>
      <Products products={products} />
    </div>
  );
};

export default Home;
