import mongoose from "mongoose";

const storyViewerSchema = new mongoose.Schema({
  story_id: { type: String, ref: "Story", required: true },
  viewer_user_id: { type: String, ref: "User", required: true },
});

const StoryViewer = mongoose.model("StoryViewer", storyViewerSchema);

export default StoryViewer;
