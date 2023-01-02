import { string } from "yup";

export type REGISTER_USER = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type ACTIVATE_USER = { token: string | string[] | undefined };
export type LOGIN_USER = { email: string; password: string };
export type CREATE_NEW_PASSWORD = {
  password: string;
  token: string | string[] | undefined;
};
export type RESET_PASSWORD = { email: string };

export type CREATE_POST = {
  postTitle: string;
  postBody: string;
  community: string;
  postImage: File[];
};
export type LIKE_POST = { postId: string };
export type SAVE_POST = { postId: string };
export type DELETE_POST = { postId: string };
export type REPORT_POST = { postId: string; body: string };

export type CREATE_COMMENT = {
  comment: string;
  postId: string | string[] | undefined;
};
export type LIKE_COMMENT = { commentId: string };
export type DELETE_COMMENT = {
  commentId: string;
};
export type REPORT_COMMENT = { commentId: string; body: string };
export type ADD_NEW_ITEM = {
  community: string;
  company: string;
  brand: string;
  name: string;
  sizeType: string;
  color: string;
  description: string;
  images: File[];
  bestBatch: {
    name: string;
    price: string;
    url: string;
  };
  cheapestBatch: {
    name: string;
    price: string;
    url: string;
  };
};
