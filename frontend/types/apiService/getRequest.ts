import { communityPages, currentPage } from "../currentPage";

export type GET_ALL_POSTS = {
  pageParam: number;
  currentPage: currentPage;
};
export type GET_POST_BY_ID = string | string[] | undefined;
export type GET_ALL_ITEMS = {
  pageParam: number;
  currentPage: communityPages;
};
