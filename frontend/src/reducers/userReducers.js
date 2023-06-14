import { USER_LOGIN } from "../constants/userConstants";

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
