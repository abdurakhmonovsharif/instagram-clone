import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    user_id: { type: String, ref: "User", required: true },
    media_url: { type: String },
    media_type: { type: String },
    views_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
