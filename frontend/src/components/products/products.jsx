import Product from "./product";

const Products = ({ products }) => {
  return (
    <div className="row">
      {products.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </div>
  );
};

export default Products;
