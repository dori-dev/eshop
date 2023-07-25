import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  listProductReducer,
  detailProductReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateProfileReducer,
  verifyCodeReducer,
} from "./reducers/userReducers";
import { orderCreateReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  listProduct: listProductReducer,
  detailProduct: detailProductReducer,
  cart: cartReducer,
  user: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateProfile: updateProfileReducer,
  verifyCode: verifyCodeReducer,
  orderCreate: orderCreateReducer,
});

const cartItems = localStorage.getItem("cartItems");
const shippingAddress = localStorage.getItem("shippingAddress");
const paymentMethod = localStorage.getItem("paymentMethod");
const userInfo = localStorage.getItem("userInfo");
const initialState = {
  cart: {
    cartItems: cartItems ? JSON.parse(cartItems) : [],
    shippingAddress: shippingAddress ? JSON.parse(shippingAddress) : {},
    paymentMethod: paymentMethod ? JSON.parse(paymentMethod) : {},
  },
  user: { userInfo: userInfo ? JSON.parse(userInfo) : null },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
