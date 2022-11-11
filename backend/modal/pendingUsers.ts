import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
        "https://res.cloudinary.com/dcpuvkirc/image/upload/v1667998882/defualt%20images/blank-profile-picture-gf01729628_1280_pdfkow.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    expireAt: {
      type: Date,
      expires: "300s",
      default: Date.now,
    },
  },
  { timestamps: true }
);

const pendingUsers =
  mongoose.models.pendingUsers || mongoose.model("PendingUsers", userSchema);
export default pendingUsers;
