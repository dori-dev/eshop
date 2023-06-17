import { USER_LOGIN, USER_REGISTER } from "../constants/userConstants";
import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN.REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/token/",
      {
        username: email,
        password: password,
      },
      config
    );
    dispatch({
      type: USER_LOGIN.SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN.FAIL,
      payload:
        error.message && error.response
          ? error.response.data.message || error.message
          : error.message,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGIN.LOGOUT });
  dispatch({ type: USER_REGISTER.LOGOUT });
};

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER.REQUEST });
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/accounts/register/",
        {
          name: name,
          email: email,
          password: password,
        },
        config
      );
      dispatch({
        type: USER_REGISTER.SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_LOGIN.REQUEST,
      });
      dispatch({
        type: USER_LOGIN.SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER.FAIL,
        payload:
          error.message && error.response
            ? error.response.data.message || error.message
            : error.message,
      });
    }
  };
