import { RequestHandler } from 'express';
import User from '../../../db/modal/user';

export const getUserPosts: RequestHandler = async (req, res, next) => {
  const { p: page }: any = req.query || 0;
  const postsPerPage = 5;
  const { options }: any = req.query;
  const { userName } = JSON.parse(options);
  const filter = {
    path: 'posts',
    populate: {
      path: 'postedBy',
      select: ['userName', 'image'],
    },
  };
  User.findOne({ userName })
    .select('posts')
    .populate(filter)
    .exec((err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Could not fetch the posts' });
      } else {
        if (data?.posts) {
          const reversedDocs = data.posts?.reverse();
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
