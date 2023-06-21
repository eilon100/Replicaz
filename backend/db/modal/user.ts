import { Model, model, models, Schema, Types } from 'mongoose';
import { BuyerRoles } from '../../types/buyer-roles';

// export interface UserAttrs {
//   userName: string;
//   hashedPassword: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   birthDate: string;
//   role?: BuyerRoles;
//   notifications: notifications;
//   image: string;
//   emailVerified: boolean;
//   posts: Types.ObjectId[];
//   savedPosts: Types.ObjectId[];
// }
// type notifications = {
//   sentUserId: Types.ObjectId;
//   postId: Types.ObjectId;
//   type: 'like' | 'comment' | 'commentLike';
//   seen: boolean;
// };

// export interface UserModel extends Model<UserAttrs> {
//   build(attrs: UserAttrs): UserAttrs;
// }

const notificationsSchema = new Schema({
  sentUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'commentLike'],
    required: true,
  },
  seen: { type: Boolean, default: false },
});

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    birthDate: { type: String, required: true },
    role: { type: String, default: 'user' },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    notifications: [{ type: notificationsSchema }],
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
  },
  { timestamps: true }
);

// userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// const User = model<UserAttrs, UserModel>('User', userSchema);
const User = models.User || model('User', userSchema);
export default User;
