import { RequestHandler } from "express";
import Post from "../../../db/modal/post";
import Report from "../../../db/modal/report";
import User from "../../../db/modal/user";

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
