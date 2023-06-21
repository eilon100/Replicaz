import { RequestHandler } from "express";
import mongoose from "mongoose";
import Comment from "../../../db/modal/comment";
import Post from "../../../db/modal/post";
import { Notifications } from "../../../utills/notifications";

export const likeComment: RequestHandler = async (req, res, next) => {
  const { commentId } = req.body;
  let like = null;
  try {
    const comment = await Comment.findById(commentId);

    const post = await Post.findById(comment.post);

    if (!comment) {
      return res.status(404).json({ error: 'Could not find the comment' });
    }

    const likeCommentSession = await mongoose.startSession();
    likeCommentSession.startTransaction();

    if (comment.likes.includes(req.userData.userId)) {
      like = false;
      comment.likes.pull(req.userData.userId);
    } else {
      like = true;
      comment.likes.push(req.userData.userId);
    }
    await Notifications(
      {
        userId: comment.postedBy,
        postId: post._id,
        sentUserId: req.userData.userId,
        type: 'commentLike',
      },
      likeCommentSession,
      like
    );
    await comment.save({ session: likeCommentSession });
    await likeCommentSession.commitTransaction();
    return res.status(200).json({
      message: `Comment ${like ? 'liked' : 'unliked'} successfully!`,
      like,
      likesLength: comment.likes.length,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error on '/post/likeComment': " + err });
  }
};
