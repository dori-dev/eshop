const Product = ({ product }) => {
  return (
    <div className="card p-3 h-100" style={{ width: "18rem" }}>
      <a href={`/product/${product._id}`} className="mb-4">
        <img src={product.image} className="card-img-top" alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/product/${product._id}`} className="text-dark">
          <h3 className="fs-4">{product.name}</h3>
        </a>
        <p className="text-muted">
          {product.rating} from {product.numReviews} reviews
        </p>
        <h4 className="card-text lead">$ {product.price}</h4>
      </div>
    </div>
  );
};

export default Product;
