import {
  ORDER_CREATE,
  ORDER_DETAILS,
  ORDER_LIST,
} from "../constants/orderConstants";
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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS.REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const authRequest = axiosInstance(userInfo, dispatch);
    const { data } = await authRequest.get(`/api/v1/orders/${id}/`);
    dispatch({
      type: ORDER_DETAILS.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS.FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST.REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const authRequest = axiosInstance(userInfo, dispatch);
    const { data } = await authRequest.get(`/api/v1/orders/`);
    dispatch({
      type: ORDER_LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST.FAIL,
      payload: getErrorMessage(error),
    });
  }
};
