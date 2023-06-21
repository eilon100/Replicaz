import { RequestHandler } from "express";
import Comment from "../../../db/modal/comment";
import Report from "../../../db/modal/report";
import User from "../../../db/modal/user";

export const reportComment: RequestHandler = async (req, res, next) => {
  const { commentId, body } = req.body;
  try {
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Could not find the comment' });
    }

    const reportedComment = await Report.findById(commentId);

    if (!reportedComment) {
      const newReport = new Report({
        _id: commentId,
        type: 'Comment',
        reports: [{ reportedBy: req.userData.userId, body: [body] }],
      });
      await newReport.save();
      res.status(201).json({ message: 'Thank you for your report' });
    } else {
      const reported = reportedComment.reports.find(
        (report: { reportedBy: string; body: string[] }) =>
          report.reportedBy.toString() === req.userData.userId
      );

      reported.body.push(body);
      await reportedComment.save();
      res.status(201).json({ message: 'Thank you for your report' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on '/post/reportpost': " + error });
  }
};
