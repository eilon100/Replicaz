import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Comment from '../db/modal/comment';
import Post from '../db/modal/post';
import Report from '../db/modal/report';
import User from '../db/modal/user';
import {
  imagesFolderDeletion,
  imagesUpload,
} from '../utills/cloudinaryActions';
import { Notifications } from '../utills/notifications';

export const getAllPosts: RequestHandler = (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const { currentPage, search } = req.query;
  const postsPerPage = 5;
  const isMainPage = currentPage === 'main';
  const searchedLength = search?.length! >= 3 ? '' : '^';
  const searchFilter = {
    ...(search && {
      $or: [{ title: { $regex: `${searchedLength}${search}`, $options: 'i' } }],
    }),
  };

  const filter = {
    ...(isMainPage && { ...searchFilter }),
    ...(!isMainPage && { ...searchFilter, community: currentPage }),
  };

  Post.find(filter)
    .populate({ path: 'postedBy', select: ['userName', 'image'] })
    .sort({ _id: -1 })
    .skip(page * postsPerPage)
    .limit(postsPerPage)
    .then((fetchedPosts) => {
      return res.status(200).send(fetchedPosts);
    })
    .catch((err) => {
      return res.status(500).json({ message: 'Could not fetch the posts' });
    });
};

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

export const createPost: RequestHandler = async (req, res, next) => {
  const mongoosePostId = new mongoose.Types.ObjectId();
  // get and validate body variables
  const { postTitle, community, postBody, postImage } = req.body;
  const postedBy = await User.findById(req.userData.userId);
  try {
    if (!postedBy) {
      return res.status(400).json({ error: 'Could not find user' });
    }

    const imageArr = await imagesUpload(
      postImage,
      `posts/${postedBy.userName}/${mongoosePostId}`
    );

    const newPost = new Post({
      _id: mongoosePostId,
      postedBy: req.userData.userId,
      community,
      title: postTitle,
      body: postBody,
      images: imageArr,
    });

    const postCreatingSession = await mongoose.startSession();
    postCreatingSession.startTransaction();
    await newPost.save({ session: postCreatingSession });
    postedBy.posts.push(newPost);
    await postedBy.save({ session: postCreatingSession });
    await postCreatingSession.commitTransaction();

    res.status(201).json({ message: 'New post created!' });
  } catch (err) {
    await imagesFolderDeletion(`posts/${postedBy.userName}/${mongoosePostId}`);
    return res
      .status(400)
      .json({ error: "Error on '/post/createPost': " + err });
  }
};

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

export const reportPost: RequestHandler = async (req, res, next) => {
  const { postId, body: reportedBody } = req.body;

  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Could not find the post' });
    }

    const reportedPost = await Report.findById(postId);

    if (!reportedPost) {
      const newReport = new Report({
        _id: postId,
        type: 'Post',
        reports: [{ reportedBy: req.userData.userId, body: [reportedBody] }],
      });

      await newReport.save();
      res.status(201).json({ message: 'Thank you for your report' });
    } else {
      const reported = reportedPost.reports.find(
        (report: { reportedBy: string; body: string[] }) =>
          report.reportedBy.toString() === req.userData.userId
      );

      reported.body.push(reportedBody);
      await reportedPost.save();
      res.status(201).json({ message: 'Thank you for your report' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/post/reportpost': " + error });
  }
};
