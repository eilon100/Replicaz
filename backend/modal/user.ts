import mongoose from "mongoose";

const Schema = mongoose.Schema;

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
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
