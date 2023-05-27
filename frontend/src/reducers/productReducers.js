import { PRODUCT_LIST, PRODUCT_DETAIL } from "../constants/productConstants";

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

export const detailProductReducer = (
  state = { product: { reviews: [] }, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL.REQUEST:
      return { ...state };
    case PRODUCT_DETAIL.SUCCESS:
      return { product: action.payload, loading: false };
    case PRODUCT_DETAIL.FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
