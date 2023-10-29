import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    post_id: { type: String, ref: "Post", required: true },
    user_id: { type: String, ref: "User", required: true },
    likes_count: { type: Number, default: 0 },
    text: { type: String, default: "" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
