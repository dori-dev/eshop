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
} from "./reducers/userReducers";

const reducer = combineReducers({
  listProduct: listProductReducer,
  detailProduct: detailProductReducer,
  cart: cartReducer,
  user: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
});

const cartItems = localStorage.getItem("cartItems");
const userInfo = localStorage.getItem("userInfo");
const initialState = {
  cart: { cartItems: cartItems ? JSON.parse(cartItems) : [] },
  user: { userInfo: userInfo ? JSON.parse(userInfo) : null },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
