import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Reviews from "./reviews";
import { roundReviews } from "./functions";
import axios from "axios";
import ProductSkeleton from "../skeleton/product";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}/`);
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <div className="container-fluid mt-4">
          <Link to="/" className="btn btn-outline-dark">
            <svg
              className="mb-1 me-2 go-back-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
            </svg>
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-6 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="col-md-3 mb-5">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h5>{product.name}</h5>
                </li>
                <li className="list-group-item">
                  <Reviews rate={product.rating} />
                  <span>
                    from <b>{roundReviews(product.reviews_count)}</b> reviews
                  </span>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-5">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <strong>Price:</strong>
                    </div>
                    <div className="col-6">
                      <b className="dollar">$</b> {product.price}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <strong>Status:</strong>
                    </div>
                    <div className="col-6">
                      {product.count_in_stock > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <button
                    disabled={product.count_in_stock === 0}
                    className="btn btn-dark w-100"
                  >
                    Add to Cart
                    <svg
                      className="mb-1 ms-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M224 464c0 26.51-21.49 48-47.1 48s-47.1-21.49-47.1-48S149.5 416 176 416S224 437.5 224 464zM569.5 44.73C563.4 36.64 554.1 32 543.1 32H360v102.1l23.03-23.03c9.375-9.375 24.56-9.375 33.94 0s9.375 24.56 0 33.94l-64 64C348.3 213.7 342.1 216 336 216s-12.28-2.344-16.97-7.031l-64-64c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L312 134.1V32H121.1L119.6 19.51C117.4 8.19 107.5 0 96 0H23.1C10.75 0 0 10.75 0 23.1S10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.29 0 26.84-9.47 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73zM463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-md-12 p-md-5 p-3 fs-5">
              <strong>Description:</strong>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
