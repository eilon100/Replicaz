import { comment } from "./comment";
import { user } from "./user";

export type post = {
  _id: string;
  title: string;
  body: string;
  postedBy: user;
  community: "Bags" | "Shoes" | "Clothes";
  images: string[];
  comments: comment[];
  likes: user[];
  saves: user[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
