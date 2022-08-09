import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  proxyHeaders: false,
  credentials: false,
  timeout: 90000,
});

http.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
  "userToken"
)}`;

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const shouldLoadHomePage =
      error.response &&
      window.location.pathname !== "/" &&
      error.response.status === 403;

    if (shouldLoadHomePage) {
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
