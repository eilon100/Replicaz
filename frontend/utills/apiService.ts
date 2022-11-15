import { axiosInstance } from "./axiosInstance";

export const apiService = {
  post: {
    REGISTER_USER(data: string) {
      return axiosInstance.post("/auth/signup", data);
    },
    LOGIN_USER(data: any) {
      return axiosInstance.post("/auth/login", data);
    },
    CREATE_NEW_PASSWORD(data: any) {
      return axiosInstance.post("/account/newpassword", data);
    },
    RESET_PASSWORD(data: any) {
      return axiosInstance.post("/account/resetpassword", data);
    },
    CREATE_POST(data: any) {
      return axiosInstance.post("/post/newpost", data);
    },
    CREATE_COMMENT(data: any) {
      return axiosInstance.post("/post/newcomment", data);
    },
  },
  get: {
    GET_ALLPOSTS(params: number) {
      return axiosInstance.get(`/post/allposts?p=${params}`);
    },
    GET_POST_BY_ID(id: string) {
      return axiosInstance.get(`/post/getpost/${id}`);
    },
    LOGOUT() {
      return axiosInstance.get("/auth/logout");
    },
  },
};
