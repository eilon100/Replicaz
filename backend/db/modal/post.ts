import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    community: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      max: 500,
    },
    images: [{ type: String, default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    saves: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  },
  { timestamps: true }
);

const Post = mongoose.models.posts || mongoose.model("Post", postSchema);
export default Post;
