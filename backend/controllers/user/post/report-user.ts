import { RequestHandler } from "express";
import Report from "../../../db/modal/report";
import User from "../../../db/modal/user";

export const reportUser: RequestHandler = async (req, res, next) => {
  const { userId, body: reportedBody } = req.body;

  try {
    if (userId === req.userData.userId) {
      return res.status(404).json({ error: 'You can not report yourself' });
    }
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: 'Could not find the user' });
    }
    const reportedUser = await User.findById(userId);
    if (!reportedUser) {
      return res
        .status(404)
        .json({ error: 'Could not find the reported user' });
    }

    const reportedPost = await Report.findById(userId);

    if (!reportedPost) {
      const newReport = new Report({
        _id: userId,
        type: 'User',
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
      .json({ error: "Error on '/user/reportuser': " + error });
  }
};
