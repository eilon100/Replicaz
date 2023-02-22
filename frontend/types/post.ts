import { comment } from "./comment";
import { communityPages } from "./currentPage";
import { user } from "./user";

export interface post {
  _id: string;
  title: string;
  body: string;
  postedBy: user;
  community: communityPages;
  images: string[];
  comments: comment[];
  likes: user[];
  saves: user[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
