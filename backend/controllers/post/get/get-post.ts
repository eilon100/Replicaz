import { RequestHandler } from "express";
import Post from "../../../db/modal/post";

export const getPost: RequestHandler = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate({
      path: 'postedBy',
      select: ['userName', 'image'],
    });

    if (!post) {
      return res.status(404).json({ message: 'Could not find the post' });
    }
    if (post.comments && post.comments.length > 0) {
      await post.populate({
        path: 'comments',
        select: '-post -seen -updatedAt',
        populate: {
          path: 'postedBy',
          select: ['userName', 'image'],
        },
      });
    }
    post.comments = post.comments.reverse();

    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).json({ message: 'Fetching post failed ' });
  }
};
