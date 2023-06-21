import { RequestHandler } from "express";
import Post from "../../../db/modal/post";
import User from "../../../db/modal/user";

export const editPost: RequestHandler = async (req, res, next) => {
  const { postId, title, body } = req.body;

  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }

    if (post.postedBy.toString() !== req.userData.userId) {
      return res
        .status(500)
        .json({ error: 'You are not allowed to delete this post!' });
    }
    post.title = title;
    post.body = body;
    await post.save();
    return res.status(200).json({
      message: 'Post edited successfully!',
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/post/editpost': " + error });
  }
};
