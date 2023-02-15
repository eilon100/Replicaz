import User from "../modal/user";
import { RequestHandler } from "express";
import { singleImageUpload } from "../utills/cloudinaryActions";
import Post from "../modal/post";

export const getUserData: RequestHandler = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne(
      { userName: username },
      { hashedPassword: 0, emailVerified: 0, savedPosts: 0, updatedAt: 0 }
    );
    if (!user) {
      return res.status(404).json({ error: "Could not find the user" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/account/getuserdata': " + error });
  }
};

export const editUserData: RequestHandler = async (req, res, next) => {
  let data = req.body;

  try {
    if (data.image) {
      const userImage = await singleImageUpload(
        data.image,
        `user-images/profile/${req.userData.userId}`
      );

      data = { image: userImage };
    }
    const user = await User.findByIdAndUpdate(req.userData.userId, data, {
      new: true,
    });

    return res.status(200).json({
      message: "Profile updated!",
      userImage: user.image,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/user/EditUserData': " + error });
  }
};

export const getSavedPosts: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const postsPerPage = 5;
  const filter = {
    path: "savedPosts",
    populate: {
      path: "postedBy",
      select: ["userName", "image"],
    },
  };
  User.findById(req.userData.userId)
    .select("savedPosts")
    .populate(filter)
    .exec((err, { savedPosts }) => {
      if (err) {
        return res.status(500).json({ message: "Could not fetch the posts" });
      } else {
        if (savedPosts) {
          const reversedDocs = savedPosts?.reverse();
          const skippedAndLimitedDocs = reversedDocs.slice(
            page * postsPerPage,
            page * postsPerPage + postsPerPage
          );
          return res.status(200).send(skippedAndLimitedDocs);
        } else {
          return res.status(200).send([]);
        }
      }
    });
};

export const getUserPosts: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const postsPerPage = 5;
  const { options }: any = req.query;
  const { userName } = JSON.parse(options);
  const filter = {
    path: "posts",
    populate: {
      path: "postedBy",
      select: ["userName", "image"],
    },
  };
  User.findOne({ userName })
    .select("posts")
    .populate(filter)
    .exec((err, { posts }) => {
      if (err) {
        return res.status(500).json({ message: "Could not fetch the posts" });
      } else {
        if (posts) {
          const reversedDocs = posts?.reverse();
          const skippedAndLimitedDocs = reversedDocs.slice(
            page * postsPerPage,
            page * postsPerPage + postsPerPage
          );
          return res.status(200).send(skippedAndLimitedDocs);
        } else {
          return res.status(200).send([]);
        }
      }
    });
};
