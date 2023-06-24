import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";
import { updateAccessTokenAction } from "../actions/userActions";

const baseURL = "http://127.0.0.1:8000";
const axiosInstance = (userInfo, dispatch) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (userInfo && dispatch) {
    headers.Authorization = `Bearer ${userInfo?.token?.access}`;
  }
  const instance = axios.create({
    baseURL,
    headers: headers,
  });
  if (userInfo && dispatch) {
    instance.interceptors.request.use(async (request) => {
      const user = jwt_decode(userInfo?.token?.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 20 * 1000;
      if (isExpired) {
        const { data } = await axios.post("/api/v1/accounts/token/refresh/", {
          refresh: userInfo?.refresh,
        });
        request.headers.Authorization = `Bearer ${data.access}`;
        dispatch(updateAccessTokenAction(data));
      }
      return request;
    });
  }
  return instance;
};

export default axiosInstance;
