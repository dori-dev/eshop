import { CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}/`);
  dispatch({
    type: CART_ITEM.ADD,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      count_in_stock: data.count_in_stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_ITEM.REMOVE,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
