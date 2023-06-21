import { RequestHandler } from "express";
import Comment from "../../../db/modal/comment";
import User from "../../../db/modal/user";

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
