import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";

const Cart = () => {
  const { id } = useParams();
  const { search } = useLocation();
  let query = {};
  const dispatch = useDispatch();
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
    <>
      <h1>Cart</h1>
    </>
  );
};

export default Cart;
