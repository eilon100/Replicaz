import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import Post from '../../../db/modal/post';
import User from '../../../db/modal/user';
import { BadRequestError } from '../../../errors/bad-request';
import {
  imagesFolderDeletion,
  imagesUpload,
} from '../../../utills/cloudinaryActions';

export const createPost: RequestHandler = async (req, res, next) => {
  const mongoosePostId = new mongoose.Types.ObjectId();
  const { postTitle, community, postBody, postImage } = req.body;

  try {
    const postedByUser = await findUser(req.userData.userId);
    const imageArr = await imagesUpload(
      postImage,
      `posts/${postedByUser.userName}/${mongoosePostId}`
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
    postedByUser.posts.push(newPost);
    await postedByUser.save({ session: postCreatingSession });
    await postCreatingSession.commitTransaction();

    return res.status(201).json({ message: 'New post created!' });
  } catch (error) {
    const postedByUser = await findUser(req.userData.userId);
    await imagesFolderDeletion(
      `posts/${postedByUser?.userName}/${mongoosePostId}`
    );
    next(error);
  }
};
async function findUser(userId: string | JwtPayload) {
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError('Could not find the user');
  }
  return user;
}
