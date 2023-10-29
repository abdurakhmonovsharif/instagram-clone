import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    user_id: { type: String, ref: "User", required: true },
    caption: { type: String, default: "" },
    media_url: { type: String },
    location: { type: String, default: "" },
    media_type: { type: String },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
