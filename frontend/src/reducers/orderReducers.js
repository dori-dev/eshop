import {
  ORDER_CREATE,
  ORDER_DETAILS,
  ORDER_LIST,
} from "../constants/orderConstants";
import { CART_ITEM } from "../constants/cartConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE.REQUEST:
      return { loading: true };
    case ORDER_CREATE.SUCCESS:
      return { order: action.payload, loading: false, success: true };
    case ORDER_CREATE.FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE.RESET:
      return {};
    case CART_ITEM.CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS.REQUEST:
      return { loading: true };
    case ORDER_DETAILS.SUCCESS:
      return { order: action.payload, loading: false };
    case ORDER_DETAILS.FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST.REQUEST:
      return { loading: true };
    case ORDER_LIST.SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ORDER_LIST.FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_LIST.RESET:
      return { orders: [] };
    default:
      return state;
  }
};
