import axios from "axios";
import { getCookie } from "cookies-next";

const token = getCookie("token");
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer fsdfsdf`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "https://replicaz-backend.vercel.app/",
  withCredentials: true,
});

export function setAuthToken(token: string) {
  console.log("start token ");
  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  console.log(axios.defaults.headers, token);
}
