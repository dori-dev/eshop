import { PRODUCT_LIST } from "../constants/productConstants";
import axios from "axios";

export const listProduct = () => async (dispatch) => {
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
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
