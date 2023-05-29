import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "./message";

const Cart = () => {
  const { id } = useParams();
  const { search } = useLocation();
  let query = {};
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  search
    .slice(1)
    .split("&")
    .forEach((item) => {
      let [key, value] = item.split("=");
      query[key] = value;
    });
  const quantity = query["quantity"] || 1;
  useEffect(() => {
    if (id && quantity) {
      dispatch(addToCart(id, quantity));
    }
  }, [id, quantity, dispatch]);
  const checkoutHandler = () => {
    console.log("checkout");
  };
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">
        Cart
        <svg
          className="ms-3 title-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M463.1 416c-26.51 0-47.1 21.49-47.1 48s21.49 48 47.1 48s47.1-21.49 47.1-48S490.5 416 463.1 416zM175.1 416c-26.51 0-47.1 21.49-47.1 48S149.5 512 175.1 512s47.1-21.49 47.1-48S202.5 416 175.1 416zM569.5 44.73c-6.109-8.094-15.42-12.73-25.56-12.73H121.1L119.6 19.51C117.4 8.19 107.5 0 96 0H23.1C10.75 0 0 10.75 0 23.1S10.75 48 23.1 48h52.14l60.28 316.5C138.6 375.8 148.5 384 160 384H488c13.25 0 24-10.75 24-23.1C512 346.7 501.3 336 488 336H179.9L170.7 288h318.4c14.29 0 26.84-9.47 30.77-23.21l54.86-191.1C577.5 63.05 575.6 52.83 569.5 44.73z" />
        </svg>
      </h1>
      {cartItems.length === 0 ? (
        <>
          <Message variant="primary" message="Your cart is empty!" />
          <div style={{ marginBottom: "500px" }}></div>
        </>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group list-group-flush">
              {cartItems.map((item, i) => (
                <li key={i} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-3">
                      <Link
                        to={`/product/${item.product}`}
                        className="d-flex justify-content-start justify-content-md-center"
                      >
                        <img
                          src={item.image}
                          className="cart-img my-4 rounded"
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="col-sm-8 col-8 row">
                      <div className="col-sm-6 col-12 mb-sm-0 mb-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col-sm-3 col-6">
                        <b className="dollar">$</b> {item.price}
                      </div>
                      <div className="col-sm-3 col-6">
                        <select
                          className="form-select"
                          aria-label="Select quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                        >
                          {Array(item.count_in_stock)
                            .fill(null)
                            .map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-1 text-end">
                      <svg
                        onClick={() => dispatch(removeFromCart(item.product))}
                        className="trash-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M32 464C32 490.5 53.5 512 80 512h288c26.5 0 48-21.5 48-48V128H32V464zM304 208C304 199.1 311.1 192 320 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM208 208C208 199.1 215.1 192 224 192s16 7.125 16 16v224c0 8.875-7.125 16-16 16s-16-7.125-16-16V208zM112 208C112 199.1 119.1 192 128 192s16 7.125 16 16v224C144 440.9 136.9 448 128 448s-16-7.125-16-16V208zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z" />
                      </svg>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-12 text-center mt-5">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row mb-3">
                      <div className="col-6 fs-4">Total Quantity</div>
                      <div className="col-6 fs-4">
                        {cartItems.reduce(
                          (total, item) => total + parseInt(item.quantity),
                          0
                        )}{" "}
                        Items
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row mt-3">
                      <div className="col-6 fs-4">Total Price</div>
                      <div className="col-6 fs-4">
                        <b className="dollar me-2">$</b>
                        {cartItems.reduce(
                          (total, item) =>
                            total +
                            parseFloat(item.price) * parseInt(item.quantity),
                          0
                        )}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <button
                      onClick={checkoutHandler}
                      className="mt-2 btn btn-lg btn-dark btn-block w-100"
                    >
                      Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
