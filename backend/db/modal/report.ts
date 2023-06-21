import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "Post", required: true } || {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reports: [
      {
        reportedBy: { type: Schema.Types.ObjectId, ref: "User", require: true },
        body: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
export default Report;
