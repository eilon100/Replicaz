import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Comment from '../../../db/modal/comment';
import Post from '../../../db/modal/post';
import Report from '../../../db/modal/report';
import User from '../../../db/modal/user';
import { imagesFolderDeletion } from '../../../utills/cloudinaryActions';

export const deletePost: RequestHandler = async (req, res, next) => {
  const { postId } = req.body;
  const postDeletionSession = await mongoose.startSession();

  try {
    const post = await Post.findById(postId).populate({
      path: 'postedBy',
      select: 'userName',
    });
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }
    const postedByUser = await User.findById(post.postedBy);

    if (!postedByUser) {
      return res.status(500).json({ error: 'Could not find this user' });
    }

    if (req.userData.role !== 'admin') {
      if (post.postedBy._id.toString() !== req.userData.userId) {
        return res
          .status(500)
          .json({ error: 'You are not allowed to delete this post!' });
      }
    }
    postDeletionSession.startTransaction();

    //delete the post from the user array
    postedByUser.posts.pull(postId);
    // delete Notifications
    const updatedNotifications = postedByUser.notifications.filter(
      (notification: any) => notification.postId.toString() !== postId
    );
    postedByUser.notifications = updatedNotifications;
    await postedByUser.save({ session: postDeletionSession });

    //delete the post comments
    await Comment.deleteMany(
      { post: postId },
      { session: postDeletionSession }
    );
    // delete Notifications

    // delete the save post from every user saves
    const deleteSaves = post.saves.map(async (save: string) => {
      const user = await User.findById(save.toString());
      if (!user) {
        throw new Error();
      }
      return user.updateOne(
        { savedPosts: user.savedPosts.pull(postId) },
        { session: postDeletionSession }
      );
    });
    await Promise.all(deleteSaves);
    await post.remove({ session: postDeletionSession });
    //delete the post reports
    await Report.findByIdAndDelete(postId, { session: postDeletionSession });

    //images Deletion
    if (post.images[0]) {
      await imagesFolderDeletion(`posts/${post.postedBy.userName}/${postId}`);
    }

    await postDeletionSession.commitTransaction();

    return res.status(200).json({ message: 'Your post deleted!' });
  } catch (err) {
    await postDeletionSession.abortTransaction();
    return res
      .status(500)
      .json({ error: "Error on '/post/deletePost': " + err });
  }
};
