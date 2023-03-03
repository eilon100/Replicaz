import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";
const [token, setToken] = useState(getCookie("token"));
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
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
    setToken(token);
  }
}
