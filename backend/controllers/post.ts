import { RequestHandler } from "express";
import mongoose from "mongoose";
import Post from "../modal/post";
import User from "../modal/user";
import {
  imagesFolderDeletion,
  imagesUpload,
} from "../utills/cloudinaryActions";

export const getAllPosts: RequestHandler = (req, res, next) => {
  const page: any = req.query.p || 0;

  const postsPerPage = 3;

  Post.find()
    .populate({ path: "postedBy", select: ["userName", "image"] })
    .sort({ _id: -1 })
    .skip(page * postsPerPage)
    .limit(postsPerPage)
    .then((fetchedPosts) => {
      return res.status(200).send(fetchedPosts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Could not fetch the posts" });
    });
};
export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate({
      path: "postedBy",
      select: ["userName", "image"],
    });

    if (!post) {
      return res.status(404).json({ message: "Could not find the post" });
    }
    if (post.comments && post.comments.length > 0) {
      await post.populate({
        path: "comments",
        select: "-post -seen -updatedAt",
        populate: {
          path: "postedBy",
          select: ["userName", "image"],
        },
      });
    }
    post.comments = post.comments.reverse();

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).json({ message: "Fetching post failed " });
  }
};
export const createPost: RequestHandler = async (req: any, res, next) => {
  const mongoosePostId = new mongoose.Types.ObjectId();
  // get and validate body variables
  const { postTitle, community, postBody, postImage } = req.body;

  try {
    const postedBy = await User.findById(req.userData.userId);
    if (!postedBy) {
      return res.status(400).json({ error: "Could not find user" });
    }

    const imageArr = await imagesUpload(postImage, {
      postedBy: postedBy.userName,
      postTitle: mongoosePostId,
    });

    const newPost = new Post({
      _id: mongoosePostId,
      postedBy: req.userData.userId,
      community: community,
      title: postTitle,
      body: postBody,
      images: imageArr,
    });

    const postCreatingSession = await mongoose.startSession();
    postCreatingSession.startTransaction();
    await newPost.save({ session: postCreatingSession });
    postedBy.posts.push(newPost);
    await postedBy.save({ session: postCreatingSession });
    await postCreatingSession.commitTransaction();

    res.status(201).json({ message: "New post created!" });
  } catch (err) {
    const postedBy = await User.findById(req.userData.userId);
    await imagesFolderDeletion({
      postedBy: postedBy.userName,
      postTitle: mongoosePostId,
    });
    return res
      .status(400)
      .json({ error: "Error on '/post/createPost': " + err });
  }
};
export const likePost: RequestHandler = async (req: any, res, next) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Could not find the post" });
    }

    if (post.likes.includes(req.userData.userId)) {
      post.likes.pull(req.userData.userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Post unliked successfully!", like: false });
    } else {
      post.likes.push(req.userData.userId);
      await post.save();
      return res
        .status(200)
        .json({ message: "Post liked successfully!", like: true });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error on '/post/likepost': " + err });
  }
};

//todo

export const savePost: RequestHandler = async (req, res, next) => {};

export const editPost: RequestHandler = async (req, res, next) => {};

export const deletePost: RequestHandler = async (req, res, next) => {};

export const reportPost: RequestHandler = async (req, res, next) => {};
