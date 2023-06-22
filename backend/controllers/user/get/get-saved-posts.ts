import { RequestHandler } from 'express';
import User from '../../../db/modal/user';

export const getSavedPosts: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const postsPerPage = 5;
  const filter = {
    path: 'savedPosts',
    populate: {
      path: 'postedBy',
      select: ['userName', 'image'],
    },
  };

  User.findById(req.userData.userId)
    .select('savedPosts')
    .populate(filter)
    .exec((err, data) => {
      if (!data?.savedPosts) return;
      if (err) {
        return res.status(500).json({ message: 'Could not fetch the posts' });
      } else {
        if (data?.savedPosts) {
          const reversedDocs = data?.savedPosts?.reverse();
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
