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
    SEARCH_POST(data: any) {
      return axiosInstance.post("/post/search", data);
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

    REPORT_USER(data: postType.REPORT_USER) {
      return axiosInstance.post("/user/reportuser", data);
    },
  },
  get: {
    GET_ALL_POSTS({ pageParam, currentPage, search }: getType.GET_ALL_POSTS) {
      return axiosInstance.get(`/post/allposts?p=${pageParam}`, {
        params: {
          currentPage,
          search,
        },
      });
    },
    GET_ALL_ITEMS({
      pageParam,
      currentPage,
      sortSelect,
      colorSelect,
      companySelect,
    }: any) {
      return axiosInstance.get(`/community/getallitems?p=${pageParam}`, {
        params: {
          currentPage,
          sortSelect,
          colorSelect,
          companySelect,
        },
      });
    },
    GET_COMMUNITY_ITEMS_DATA(ctx: any) {
      return axiosInstance.get(`/community/itemsdata/${ctx.query.page}`);
    },
    GET_POST_BY_ID(postId: getType.GET_POST_BY_ID) {
      return axiosInstance.get(`/post/getpost/${postId}`);
    },
    GET_USER_DATA(ctx: any) {
      return axiosInstance.get(`/user/getuserdata/${ctx.query.username}`);
    },
    GET_USER_POSTS({ pageParam, options }: any) {
      return axiosInstance.get(`/user/posts?p=${pageParam}`, {
        params: {
          options,
        },
      });
    },
    GET_USER_SAVED_POSTS({ pageParam }: any) {
      return axiosInstance.get(`/user/savedposts?p=${pageParam}`);
    },
    GET_ALL_NOTIFICATIONS({ pageParam, seen }: any) {
      return axiosInstance.get(`/user/notifications?p=${pageParam}`, {
        params: {
          seen,
        },
      });
    },
  },
  patch: {
    EDIT_POST(data: patchType.EDIT_POST) {
      return axiosInstance.patch("/post/editpost", data);
    },
    EDIT_COMMENT(data: patchType.EDIT_COMMENT) {
      return axiosInstance.patch("/comment/editcomment", data);
    },
    EDIT_USER_DATA(data: patchType.EDIT_USER_DATA) {
      return axiosInstance.patch("/user/edit", data);
    },
    MAKE_NOTIFICATION_SEEN(data: any) {
      return axiosInstance.patch("/user/notificationseen", data);
    },
  },
};
