import { CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}/`);
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
