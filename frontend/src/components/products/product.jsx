import { Link } from "react-router-dom";
import Reviews from "./reviews";

const roundReviews = (reviews) => {
  const decPlaces = Math.pow(10, 1);
  // Enumerate reviews abbreviations
  const abbreviations = ["k", "m", "b", "t"];
  for (let i = abbreviations.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    let size = Math.pow(10, (i + 1) * 3);
    if (size <= reviews) {
      reviews = Math.round((reviews * decPlaces) / size) / decPlaces;
      if (reviews === 1000 && i < abbreviations.length - 1) {
        reviews = 1;
        i++;
      }
      reviews += abbreviations[i];
      break;
    }
  }
  return reviews;
};

const Product = ({ product }) => {
  return (
    <div className="card p-3 h-100" style={{ width: "18rem" }}>
      <Link to={`/product/${product._id}`} className="mb-4">
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`} className="text-dark">
          <h3 className="fs-4">{product.name}</h3>
        </Link>
        <p className="text-muted">
          <Reviews rate={product.rating} />
          <span>
            from <b>{roundReviews(product.numReviews)}</b> reviews
          </span>
        </p>
        <h4 className="card-text fw-bold mt-4">
          <b style={{ color: "#16a085" }}>$</b> {product.price}
        </h4>
      </div>
    </div>
  );
};

export default Product;
