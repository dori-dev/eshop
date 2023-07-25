import { ORDER_CREATE } from "../constants/orderConstants";
import { CART_ITEM } from "../constants/cartConstants";

import axiosInstance from "../utils/axiosInstance";
import { getErrorMessage } from "../utils/error";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE.REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const authRequest = axiosInstance(userInfo, dispatch);
    const { data } = await authRequest.post("/api/v1/orders/add/", order);
    dispatch({
      type: ORDER_CREATE.SUCCESS,
      payload: data,
    });
    dispatch({ type: CART_ITEM.CLEAR_ITEMS });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE.FAIL,
      payload: getErrorMessage(error),
    });
  }
};
