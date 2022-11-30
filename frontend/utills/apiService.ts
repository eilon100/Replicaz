import { axiosInstance } from "./axiosInstance";

export const apiService = {
  post: {
    REGISTER_USER(data: any) {
      return axiosInstance.post("/auth/signup", data);
    },
    ACTIVATE_USER(data: any) {
      return axiosInstance.post("/auth/activate", data);
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
    LIKE_POST(data: any) {
      return axiosInstance.post("/post/likepost", data);
    },
    SAVE_POST(data: any) {
      return axiosInstance.post("/post/savepost", data);
    },
    DELETE_POST(data: any) {
      return axiosInstance.post("/post/deletepost", data);
    },
    REPORT_POST(data: any) {
      return axiosInstance.post("/post/reportpost", data);
    },
  },
  get: {
    GET_ALLPOSTS(params: number) {
      return axiosInstance.get(`/post/allposts?p=${params}`);
    },
    GET_POST_BY_ID(id: string) {
      return axiosInstance.get(`/post/getpost/${id}`);
    },
    GET_USER_DATA() {
      return axiosInstance.get("/account/getuserdata");
    },
    LOGOUT() {
      return axiosInstance.get("/auth/logout");
    },
  },
  patch: {
    EDIT_POST(data: any) {
      return axiosInstance.patch("/post/editpost", data);
    },
  },
};
