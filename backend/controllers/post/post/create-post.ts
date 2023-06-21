import { RequestHandler } from "express";
import mongoose from "mongoose";
import Post from "../../../db/modal/post";
import User from "../../../db/modal/user";
import { imagesFolderDeletion, imagesUpload } from "../../../utills/cloudinaryActions";

export const createPost: RequestHandler = async (req, res, next) => {
  const mongoosePostId = new mongoose.Types.ObjectId();
  // get and validate body variables
  const { postTitle, community, postBody, postImage } = req.body;
  const postedBy = await User.findById(req.userData.userId);
  try {
    if (!postedBy) {
      return res.status(400).json({ error: 'Could not find user' });
    }

    const imageArr = await imagesUpload(
      postImage,
      `posts/${postedBy.userName}/${mongoosePostId}`
    );

    const newPost = new Post({
      _id: mongoosePostId,
      postedBy: req.userData.userId,
      community,
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

    res.status(201).json({ message: 'New post created!' });
  } catch (err) {
    await imagesFolderDeletion(`posts/${postedBy.userName}/${mongoosePostId}`);
    return res
      .status(400)
      .json({ error: "Error on '/post/createPost': " + err });
  }
};
