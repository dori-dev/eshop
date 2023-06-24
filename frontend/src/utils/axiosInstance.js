import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";
import { updateAccessTokenAction } from "../actions/userActions";

const baseURL = "http://127.0.0.1:8000";
const axiosInstance = (userInfo, dispatch) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.token?.access}`,
    },
  });
  if (userInfo) {
    instance.interceptors.request.use(async (request) => {
      const user = jwt_decode(userInfo?.token?.access);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 5000;
      console.log(dayjs.unix(user.exp));
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
