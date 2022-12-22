import * as postType from "../types/apiService/postRequest";
import * as patchType from "../types/apiService/patchRequest";
import * as getType from "../types/apiService/getRequest";
import { axiosInstance } from "./axiosInstance";

export const apiService = {
  post: {
    REGISTER_USER(data: postType.REGISTER_USER) {
      return axiosInstance.post("/auth/signup", data);
    },
    ACTIVATE_USER(data: postType.ACTIVATE_USER) {
      return axiosInstance.post("/auth/activate", data);
    },
    LOGIN_USER(data: postType.LOGIN_USER) {
      return axiosInstance.post("/auth/login", data);
    },
    CREATE_NEW_PASSWORD(data: postType.CREATE_NEW_PASSWORD) {
      return axiosInstance.post("/account/newpassword", data);
    },
    RESET_PASSWORD(data: postType.RESET_PASSWORD) {
      return axiosInstance.post("/account/resetpassword", data);
    },

    CREATE_POST(data: postType.CREATE_POST) {
      return axiosInstance.post("/post/newpost", data);
    },
    LIKE_POST(data: postType.LIKE_POST) {
      return axiosInstance.post("/post/likepost", data);
    },
    SAVE_POST(data: postType.SAVE_POST) {
      return axiosInstance.post("/post/savepost", data);
    },
    DELETE_POST(data: postType.DELETE_POST) {
      return axiosInstance.post("/post/deletepost", data);
    },
    REPORT_POST(data: postType.REPORT_POST) {
      return axiosInstance.post("/post/reportpost", data);
    },

    CREATE_COMMENT(data: postType.CREATE_COMMENT) {
      return axiosInstance.post("/post/newcomment", data);
    },
    LIKE_COMMENT(data: postType.LIKE_COMMENT) {
      return axiosInstance.post("/comment/likecomment", data);
    },
    DELETE_COMMENT(data: postType.DELETE_COMMENT) {
      return axiosInstance.post("/comment/deletecomment", data);
    },
    REPORT_COMMENT(data: postType.REPORT_COMMENT) {
      return axiosInstance.post("/comment/reportcomment", data);
    },
    ADD_NEW_ITEM(data: postType.ADD_NEW_ITEM) {
      return axiosInstance.post("community/addnewitem", data);
    },
  },
  get: {
    GET_ALL_POSTS({ pageParam, currentPage }: any) {
      return axiosInstance.get(`/post/allposts?p=${pageParam}`, {
        params: {
          currentPage,
        },
      });
    },
    GET_ALL_ITEMS({ pageParam, currentPage }: any) {
      return axiosInstance.get(`/community/getallitems?p=${pageParam}`, {
        params: {
          currentPage,
        },
      });
    },
    GET_POST_BY_ID(postId: getType.GET_POST_BY_ID) {
      return axiosInstance.get(`/post/getpost/${postId}`);
    },
    GET_USER_DATA() {
      return axiosInstance.get("/account/getuserdata");
    },
    LOGOUT() {
      return axiosInstance.get("/auth/logout");
    },
  },
  patch: {
    EDIT_POST(data: patchType.EDIT_POST) {
      return axiosInstance.patch("/post/editpost", data);
    },
    EDIT_COMMENT(data: patchType.EDIT_COMMENT) {
      return axiosInstance.patch("/comment/editcomment", data);
    },
  },
};
