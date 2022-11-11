import { axiosInstance } from "./axiosInstance";

export const apiService = {
  post: {
    CREATE_POST(data: any) {
      return axiosInstance.post("/post/newpost", data);
    },
    CREATE_NEW_PASSWORD(data: any) {
      return axiosInstance.post("/account/newpassword", data);
    },
    RESET_PASSWORD(data: any) {
      return axiosInstance.post("/account/resetpassword", data);
    },
    REGISTER_USER(data: any) {
      return axiosInstance.post("/auth/signup", data);
    },
    LOGIN_USER(data: any) {
      return axiosInstance.post("/auth/login", data);
    },
  },
  get: {
    GET_ALLPOSTS(params: number) {
      return axiosInstance.get(`/post/allposts?p=${params}`);
    },
    LOGOUT() {
      return axiosInstance.get("/auth/logout");
    },
  },
};
