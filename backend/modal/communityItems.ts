import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newItemSchema = new Schema(
  {
    community: { type: String, required: true },
    company: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sizeType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    mainImage: { type: String, required: true },
    images: [{ type: String, default: [], required: true }],
    bestBatch: {
      type: { name: String, price: Number, url: String },
      required: true,
    },
    cheapestBatch: {
      type: { name: String, price: Number, url: String },
      required: true,
    },
  },
  { timestamps: true }
);

const communityItem =
  mongoose.models.communityItem ||
  mongoose.model("communityItem", newItemSchema);
export default communityItem;
