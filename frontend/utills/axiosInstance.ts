import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export const axiosInstance = axios.create({
  headers: {
    cookies: `${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});
