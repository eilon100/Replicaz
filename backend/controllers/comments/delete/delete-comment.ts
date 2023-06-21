import { RequestHandler } from "express";
import mongoose from "mongoose";
import Comment from "../../../db/modal/comment";
import Post from "../../../db/modal/post";
import Report from "../../../db/modal/report";
import User from "../../../db/modal/user";
import { Notifications } from "../../../utills/notifications";

export const deleteComment: RequestHandler = async (req, res, next) => {
  const { commentId } = req.body;
  const commentDeletionSession = await mongoose.startSession();

  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Could not find the comment' });
    }
    const post = await Post.findById(comment.post);
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }

    if (comment.postedBy.toString() !== req.userData.userId) {
      return res
        .status(500)
        .json({ error: 'You are not allowed to delete this comment!' });
    }

    commentDeletionSession.startTransaction();
    //delete the comment from all comments
    await Comment.findByIdAndDelete(
      { _id: commentId },
      { session: commentDeletionSession }
    );

    //delete the comment from the post
    post.comments.pull(commentId);
    await post.save({ session: commentDeletionSession });

    //delete the comment reports
    await Report.findByIdAndDelete(commentId, {
      session: commentDeletionSession,
    });

    //delete the notification about the comment
    await Notifications(
      {
        userId: post.postedBy,
        postId: post._id,
        sentUserId: req.userData.userId,
        type: 'comment',
      },
      commentDeletionSession,
      false
    );
    await commentDeletionSession.commitTransaction();

    res.status(200).json({ message: 'Your comment deleted!' });
  } catch (error) {
    await commentDeletionSession.abortTransaction();
    return res
      .status(500)
      .json({ error: "Error on '/post/deleteComment': " + error });
  }
};
