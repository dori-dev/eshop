import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "./steps";
import Message from "../message";
import { createOrder } from "../../actions/orderActions";
import { ORDER_CREATE } from "../../constants/orderConstants";
import RingLoader from "react-spinners/RingLoader";
import { override } from "../account/utils";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // redux
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { error, loading, order, success } = useSelector(
    (state) => state.orderCreate
  );
  // items cost
  const itemsCost = cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * parseInt(item.quantity),
    0
  );
  const taxPrice = 0;
  const shippingPrice = 10;
  const totalPrice = itemsCost + 10;
  // place order
  const placeOrder = () => {
    dispatch(
      createOrder({
        order_items: cartItems,
        shipping_address: shippingAddress,
        payment_method: "PayPal",
        items_cost: itemsCost,
        shipping_price: shippingPrice,
        tax_price: taxPrice,
        total_price: totalPrice,
      })
    );
  };
  // redirect when shipping address is null
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
    if (success) {
      dispatch({ type: ORDER_CREATE.RESET });
      navigate(`/order/${order.id}/`);
    }
  }, [navigate, dispatch, shippingAddress, success, order]);
  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-md-center">
        <div className="col-md-10 col-12">
          <CheckOutSteps />
          <div className="row justify-content-center">
            <div className="col-col-12">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row mb-3">
                    <div className="col-12 fs-4 fw-bold">Shipping</div>
                    <div className="col-12 fs-6">
                      {shippingAddress.country} - {shippingAddress.city} -{" "}
                      {shippingAddress.address}
                      <br />
                      Zip Code: {shippingAddress.zipCode}
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="col-12 fs-4 fw-bold">Items</div>
                  <ul className="list-group list-group-flush">
                    {cartItems.map((item, i) => (
                      <li key={i} className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-3 d-flex justify-content-start">
                            <Link
                              to={`/product/${item.product}`}
                              className="d-flex justify-content-start justify-content-md-center"
                            >
                              <img
                                src={item.image}
                                className="order-img my-4 rounded"
                                alt={item.name}
                              />
                            </Link>
                          </div>
                          <div className="col-5">
                            <div>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                          </div>
                          <div className="col-4">
                            <div>
                              {item.quantity} x {item.price} ={" "}
                              <b className="dollar">$</b>
                              {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="list-group-item">
                  <div className="fs-4 fw-bold mb-2">Total Price</div>
                  <div className="fs-6">
                    <div className="">
                      Cost of{" "}
                      {cartItems.reduce(
                        (total, item) => total + parseInt(item.quantity),
                        0
                      )}{" "}
                      items:
                      <b className="mx-2">
                        <span className="dollar">$</span>
                        {itemsCost}
                      </b>
                    </div>
                    <div className="mb-2 border-bottom pb-1 w-fit">
                      Transport cost:
                      <b className="mx-2">
                        <span className="dollar">$</span>
                        {shippingPrice}
                      </b>
                    </div>
                    <div className="">
                      Total:{" "}
                      <b className="mx-2">
                        <span className="dollar">$</span>
                        {totalPrice}
                      </b>
                    </div>
                  </div>
                </li>
                <li className="list-group-item row">
                  <div className="col-md-6 col-sm-8 col-12">
                    {error && <Message variant="danger" message={error} />}
                    {loading ? (
                      <RingLoader
                        color="#000"
                        loading={loading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading"
                      />
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={placeOrder}
                      className="mt-2 btn btn-lg btn-dark btn-block w-100"
                    >
                      Place Order
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
