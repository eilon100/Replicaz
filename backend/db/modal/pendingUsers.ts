import { Document, model, Model, Schema, Types } from 'mongoose';

export interface PendingUserAttrs {
  userName: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emailToken: string;
  birthDate: string;
  emailVerified: boolean;
}

export interface PendingUserDoc extends PendingUserAttrs, Document {}

export interface PendingUserModal extends Model<PendingUserDoc> {
  build(attrs: PendingUserAttrs): PendingUserDoc;
}

const pendingUserSchema = new Schema(
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailToken: {
      type: String,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 5,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      expires: '300s',
      default: Date.now,
    },
  },
  { timestamps: true }
);

pendingUserSchema.statics.build = (attrs: PendingUserAttrs) =>
  new PendingUser(attrs);

const PendingUser = model<PendingUserDoc, PendingUserModal>(
  'PendingUser',
  pendingUserSchema
);

export default PendingUser;