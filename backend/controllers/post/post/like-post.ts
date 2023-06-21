import { RequestHandler } from "express";
import mongoose from "mongoose";
import Post from "../../../db/modal/post";
import { Notifications } from "../../../utills/notifications";

export const likePost: RequestHandler = async (req, res, next) => {
  const { postId } = req.body;
  let like = null;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }
    const likePostSession = await mongoose.startSession();
    likePostSession.startTransaction();

    if (post.likes.includes(req.userData.userId)) {
      post.likes.pull(req.userData.userId);
      like = false;
    } else {
      post.likes.push(req.userData.userId);
      like = true;
    }

    await Notifications(
      {
        userId: post.postedBy,
        postId,
        sentUserId: req.userData.userId,
        type: 'like',
      },
      likePostSession,
      like
    );
    await post.save({ session: likePostSession });
    await likePostSession.commitTransaction();

    return res.status(200).json({
      message: `Post ${like ? 'liked' : 'unliked'} successfully!`,
      like,
      likesLength: post.likes.length,
    });
  } catch (err) {
    return res.status(500).json({ error: "Error on '/post/likepost': " + err });
  }
};
