import { ORDER_CREATE } from "../constants/orderConstants";
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
