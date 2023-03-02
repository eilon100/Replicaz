import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "https://replicaz-backend.vercel.app/",
  withCredentials: true,
});
export function setAuthToken(token: string) {
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}
