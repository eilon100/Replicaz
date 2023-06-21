import { RequestHandler } from "express";
import mongoose from "mongoose";
import Comment from "../../../db/modal/comment";
import Post from "../../../db/modal/post";
import User from "../../../db/modal/user";
import { Notifications } from "../../../utills/notifications";

export const createComment: RequestHandler = async (req, res, next) => {
  const { comment, postId } = req.body;
  const mongooseCommentId = new mongoose.Types.ObjectId();

  try {
    const commentedPost = await Post.findById(postId);
    if (!commentedPost) {
      return res.status(500).json({ error: 'could not find post' });
    }
    const commentedUser = await User.findById(req.userData.userId);
    if (!commentedUser) {
      return res.status(500).json({ error: 'You are not allowed to comment' });
    }
    const newComment = new Comment({
      _id: mongooseCommentId,
      post: postId,
      postedBy: commentedUser._id,
      body: comment,
    });

    const commentCreatingSession = await mongoose.startSession();
    commentCreatingSession.startTransaction();
    await newComment.save({ session: commentCreatingSession });
    commentedPost.comments.push(newComment);
    await commentedPost.save({ session: commentCreatingSession });
    await Notifications(
      {
        userId: commentedPost.postedBy,
        postId,
        sentUserId: req.userData.userId,
        type: 'comment',
      },
      commentCreatingSession,
      true
    );
    await commentCreatingSession.commitTransaction();
    res.status(201).json({ message: 'New comment created!' });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Create comment failed pleas try again ' + err });
  }
};
