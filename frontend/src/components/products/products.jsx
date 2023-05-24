import Product from "./product";

const Products = ({ products }) => {
  return (
    <div className="row">
      {products.map((product, i) => (
        <div key={i} className="col-xl-3 col-lg-4 col-md-6 mb-5">
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
