import {
  USER_LOGIN,
  USER_REGISTER,
  USER_DETAILS,
  UPDATE_PROFILE,
} from "../constants/userConstants";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN.REQUEST });
    const config = {
      header: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/accounts/token/",
      {
        email: email,
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
  dispatch({ type: USER_DETAILS.RESET });
  dispatch({ type: UPDATE_PROFILE.RESET });
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

export const getUserDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS.REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const instance = axiosInstance(userInfo, dispatch);
    const { data } = await instance.get("/api/v1/accounts/profile/");
    dispatch({
      type: USER_DETAILS.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS.FAIL,
      payload:
        error.message && error.response
          ? error.response.data.message || error.message
          : error.message,
    });
  }
};

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE.REQUEST });
    const {
      user: { userInfo },
    } = getState();
    const instance = axiosInstance(userInfo, dispatch);
    const { data } = await instance.put(
      "/api/v1/accounts/profile/update/",
      user
    );
    dispatch({
      type: UPDATE_PROFILE.SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN.SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE.FAIL,
      payload: error.response ? error.response.data.details : error.message,
    });
  }
};

export const updateAccessTokenAction = (tokens) => (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  userInfo.token = tokens;
  dispatch({
    type: USER_LOGIN.SUCCESS,
    payload: userInfo,
  });
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
