import {
  USER_LOGIN,
  USER_REGISTER,
  USER_DETAILS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN.REQUEST:
      return { loading: true };
    case USER_LOGIN.SUCCESS:
      return { userInfo: action.payload, loading: false };
    case USER_LOGIN.FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER.REQUEST:
      return { loading: true };
    case USER_REGISTER.SUCCESS:
      return { userInfo: action.payload, loading: false };
    case USER_REGISTER.FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS.REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS.SUCCESS:
      return { user: action.payload, loading: false };
    case USER_DETAILS.FAIL:
      return { error: action.payload, loading: false };
    case USER_DETAILS.RESET:
      return { user: {} };
    default:
      return state;
  }
};
