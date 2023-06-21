import { RequestHandler } from "express";
import mongoose from "mongoose";
import Post from "../../../db/modal/post";
import User from "../../../db/modal/user";

export const savePost: RequestHandler = async (req, res, next) => {
  const { postId } = req.body;
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }
    const savePostSession = await mongoose.startSession();
    savePostSession.startTransaction();

    if (post.saves.includes(req.userData.userId)) {
      post.saves.pull(req.userData.userId);
      await post.save({ session: savePostSession });
      user.savedPosts.pull(postId);
      await user.save({ session: savePostSession });
      await savePostSession.commitTransaction();
      return res.status(200).json({
        message: 'Post unsaved!',
        saved: false,
      });
    } else {
      post.saves.push(req.userData.userId);
      await post.save({ session: savePostSession });
      user.savedPosts.push(postId);
      await user.save({ session: savePostSession });
      await savePostSession.commitTransaction();
      return res.status(200).json({
        message: 'Post saved!',
        saved: true,
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error on '/post/savePost': " + err });
  }
};
