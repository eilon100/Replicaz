import { NextFunction, Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import Comment from '../db/modal/comment';
import Post from '../db/modal/post';
import Report from '../db/modal/report';
import User from '../db/modal/user';
import { Notifications } from '../utills/notifications';

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

export const editComment: RequestHandler = async (req, res, next) => {
  const { commentId, body } = req.body;
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Could not find the comment' });
    }

    if (comment.postedBy.toString() !== req.userData.userId) {
      return res
        .status(500)
        .json({ error: 'You are not allowed to edit this comment!' });
    }

    comment.body = body;
    await comment.save();
    return res.status(200).json({
      message: 'Comment edited successfully!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/post/editcomment': " + error });
  }
};

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

export const reportComment: RequestHandler = async (req, res, next) => {
  const { commentId, body } = req.body;
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Could not find the comment' });
    }

    const reportedComment = await Report.findById(commentId);

    if (!reportedComment) {
      const newReport = new Report({
        _id: commentId,
        type: 'Comment',
        reports: [{ reportedBy: req.userData.userId, body: [body] }],
      });
      await newReport.save();
      res.status(201).json({ message: 'Thank you for your report' });
    } else {
      const reported = reportedComment.reports.find(
        (report: { reportedBy: string; body: string[] }) =>
          report.reportedBy.toString() === req.userData.userId
      );

      reported.body.push(body);
      await reportedComment.save();
      res.status(201).json({ message: 'Thank you for your report' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/post/reportpost': " + error });
  }
};
