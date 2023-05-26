import { PRODUCT_LIST } from "../constants/productConstants";
import axios from "axios";

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST.REQUEST });
    const { data } = await axios.get("/api/v1/products/");
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
