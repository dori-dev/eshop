import { useEffect } from "react";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { override } from "../account/utils";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // redux
  const { error, loading, order } = useSelector((state) => state.orderDetails);
  var createdAt = "";
  if (order) {
    const time = new Date(order.created_at);
    createdAt = `${time.getFullYear()}/${time.getMonth()}/${time.getDate()}`;
  }
  useEffect(() => {
    if (!order || order.id !== Number(id)) {
      dispatch(getOrderDetails(Number(id)));
    }
  }, [order, id, dispatch]);
  return (
    <>
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
      {order ? (
        <div className="container-fluid mt-4">
          <h1>Order #{order.id}</h1>
          <span>This order created at {createdAt}</span>
          <hr />
          <div className="mb-4">
            <h2 className="fw-bold">User</h2>
            <div>
              <span className="fw-bold">name:</span> {order.user.name}
            </div>
            <div>
              <span className="fw-bold">email: </span>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="fw-bold">Address</h2>
            <div>
              <span className="fw-bold">address:</span>{" "}
              {order.shipping_address.country} - {order.shipping_address.city} -{" "}
              {order.shipping_address.address}
            </div>
            <div>
              <span className="fw-bold">zip code: </span>
              {order.shipping_address.zip_code}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="fw-bold">Delivered</h2>
            {order.is_delivered ? (
              <div>
                <span className="fw-bold">delivered at: </span>
                {order.delivered_at}
              </div>
            ) : (
              <Message
                variant="warning"
                message="The order has not yet been delivered."
              />
            )}
          </div>
          <div className="mb-4">
            <h2 className="fw-bold">Payment</h2>
            {order.is_paid ? (
              <div>
                <span className="fw-bold">paid at: </span>
                {order.paid_at}
              </div>
            ) : (
              <div
                className="alert alert-warning d-flex align-items-center me-md-5 p-2 alert-dismissible fade show w-fit mb-0"
                role="alert"
              >
                <div className="fs-6">You have not paid the order yet.</div>
              </div>
            )}
            <div>
              <span className="fw-bold">payment method:</span>{" "}
              {order.payment_method}
            </div>
            <div>
              <span className="fw-bold">items cost: </span>
              <b className="dollar">$</b>
              {order.items_cost}
            </div>
            <div>
              <span className="fw-bold">tax price: </span>
              <b className="dollar">$</b>
              {order.tax_price}
            </div>
            <div>
              <span className="fw-bold">shipping price: </span>
              <b className="dollar">$</b>
              {order.shipping_price}
            </div>
            <div>
              <span className="fw-bold">total price: </span>
              <b className="dollar">$</b>
              {order.total_price}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="fw-bold">Items</h2>
            <ul className="list-group list-group-flush">
              {order.order_items.map((item, i) => (
                <li key={i} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-3 d-flex justify-content-start">
                      <Link
                        to={`/product/${item.product}`}
                        className="d-flex justify-content-start justify-content-md-center"
                      >
                        <img
                          src={`http://127.0.0.1:8000${item.image}`}
                          className="order-img my-4 rounded"
                          alt={item.name}
                        />
                      </Link>
                    </div>
                    <div className="col-5">
                      <div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default OrderDetail;
