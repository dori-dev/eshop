import { useSelector } from "react-redux";
import Message from "../message";
import RingLoader from "react-spinners/RingLoader";
import { Link } from "react-router-dom";
import { override } from "./utils";
import { formatDate } from "../../utils/date";

const OrderList = () => {
  // order list
  const { orders, error, loading } = useSelector((state) => state.orders);
  return (
    <div>
      <h1 className="mb-4">All Orders</h1>
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
      {orders && orders.length === 0 ? (
        <Message variant="warning" message="There is no any orders here." />
      ) : (
        <></>
      )}
      {orders && orders.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Count</th>
              <th scope="col">Status</th>
              <th scope="col">Delivered</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, id) => (
              <tr key={id}>
                <th scope="row">{order.id}</th>
                <td>{formatDate(order.created_at)}</td>
                <td>
                  <b className="dollar">$</b>
                  {order.total_price}
                </td>
                <td>{order.order_items.length} items</td>
                <td>
                  {order.is_paid ? (
                    <span className="badge rounded-pill text-bg-success">
                      Paid
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger">
                      Un Paid
                    </span>
                  )}
                </td>
                <td>
                  {order.is_delivered ? (
                    <span className="badge rounded-pill text-bg-success">
                      Delivered
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-danger">
                      Not Delivered
                    </span>
                  )}
                </td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/order/${order.id}/`}
                  >
                    More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderList;
