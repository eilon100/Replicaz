import mongoose, { Document, model, Model, Schema, Types } from 'mongoose';

// export interface PostAttrs {
//   _id?: any;
//   postedBy: Types.ObjectId;
//   title: string;
//   community: string;
//   body: string;
//   images?: string[];
// }

// export interface PostDoc extends PostAttrs, Document {
//   likes: Types.DocumentArray<Types.ObjectId>;
//   saves: Types.DocumentArray<Types.ObjectId>;
//   comments: Types.DocumentArray<Types.ObjectId>;
// }

// export interface PostModel extends Model<PostDoc> {
//   build(attrs: PostAttrs): PostDoc;
// }

const postSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    saves: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
  },
  { timestamps: true }
);
// postSchema.statics.build = (attrs: PostAttrs) => new Post(attrs);

// const Post = model<PostDoc, PostModel>('Post', postSchema);
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
