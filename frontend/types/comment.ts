import { post } from "./post";
import { user } from "./user";

export interface comment {
  _id: string;
  post: post;
  body: string;
  postedBy: user;
  likes: user[];
  createdAt: string;
}
