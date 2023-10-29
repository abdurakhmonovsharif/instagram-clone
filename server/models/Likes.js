import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  post_id: { type: String, ref: "Post", required: true },
  user_id: { type: String, ref: "User", required: true },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;

