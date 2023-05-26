import { Link } from "react-router-dom";
import Reviews from "./reviews";
import { roundReviews } from "./functions";

const Product = ({ product }) => {
  return (
    <div className="card p-3 h-100" style={{ width: "18rem" }}>
      <Link to={`/product/${product.id}`} className="mb-4">
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="text-dark">
          <h3 className="fs-4">{product.name}</h3>
        </Link>
        <div className="text-muted">
          <Reviews rate={product.rating} />
          <span>
            from <b>{roundReviews(product.reviews_count)}</b> reviews
          </span>
        </div>
        <h4 className="card-text fw-bold mt-4">
          <b className="dollar">$</b> {product.price}
        </h4>
      </div>
    </div>
  );
};

export default Product;
