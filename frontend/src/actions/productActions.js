import { PRODUCT_LIST, PRODUCT_DETAIL } from "../constants/productConstants";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST.REQUEST });
    const { data } = await axios.get("/api/v1/products/list/");
    dispatch({
      type: PRODUCT_LIST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST.FAIL,
      payload:
        error.message && error.response
          ? error.response.data.message || error.message
          : error.message,
    });
  }
};

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL.REQUEST });
    const { data } = await axios.get(`/api/v1/products/${id}/`);
    dispatch({
      type: PRODUCT_DETAIL.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL.FAIL,
      payload:
        error.message && error.response
          ? error.response.data.message || error.message
          : error.message,
    });
  }
};
