import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
