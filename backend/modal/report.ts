import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    reportedBy: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);
export default Report;
