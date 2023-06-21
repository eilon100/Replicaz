import { RequestHandler } from "express";
import Post from "../../../db/modal/post";

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
