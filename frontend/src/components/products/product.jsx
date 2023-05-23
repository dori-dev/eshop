const Product = ({ product }) => {
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-5">
      <h3>{product.name}</h3>
    </div>
  );
};

export default Product;
