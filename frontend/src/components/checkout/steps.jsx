import { NavLink } from "react-router-dom";

const CheckOutSteps = () => {
  return (
    <ul className="nav nav-tabs mb-3 checkout-step">
      <li className="nav-item">
        <NavLink className="nav-link" data-toggle="tab" to="/cart">
          Cart
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" data-toggle="tab" to="/shipping">
          Shipping Address
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" data-toggle="tab" to="/payment" disable>
          Payment
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" data-toggle="tab" to="/order">
          Order
        </NavLink>
      </li>
    </ul>
  );
};

export default CheckOutSteps;
