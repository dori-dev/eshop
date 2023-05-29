import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
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
  return (
    <div className="container-fluid">
      <h1 className="mt-4 mb-5">Cart</h1>
      {cartItems.length === 0 ? (
        <Message variant="primary" message="Your cart is empty!" />
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group list-group-flush">
              {cartItems.map((item, i) => (
                <li key={i} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-sm-3 col-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="d-flex justify-content-start justify-content-md-center"
                      >
                        <img
                          src={item.image}
                          className="cart-img my-4"
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="col-sm-9 col-8 row">
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-4 bg-dark text-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
            dolorem ullam sit voluptates deserunt consequuntur atque mollitia
            praesentium illum laboriosam cumque delectus ex perferendis. Ducimus
            veniam natus sit similique doloribus.
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
