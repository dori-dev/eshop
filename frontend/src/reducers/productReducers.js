import { PRODUCT_LIST } from "../constants/productConstants";

export const listProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST.REQUEST:
      return { products: [], loading: true };
    case PRODUCT_LIST.SUCCESS:
      return { products: action.payload, loading: false };
    case PRODUCT_LIST.FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
