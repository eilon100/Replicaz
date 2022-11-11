import express from "express";
import { createComment } from "../controllers/comments";
import { createPost, getAllPosts } from "../controllers/post";
import { isAuth } from "../middleware/is-auth";

const postRouter = express.Router();

postRouter.get("/allposts", getAllPosts);

postRouter.use(isAuth);

postRouter.post("/newpost", createPost);

postRouter.post("/newcomment", createComment);

export { postRouter };
