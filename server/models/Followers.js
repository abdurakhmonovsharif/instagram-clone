import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
  user_id: { type: String, ref: "User", required: true },
  follower_user_id: { type: String, ref: "User", required: true },
});

const Follower = mongoose.model("Follower", followerSchema);
export default Follower;
