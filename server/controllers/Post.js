import Post from "../models/Post";
import { postMedia } from "./File";

// CREATE POST //
export const createPost = async (req, res) => {
  try {
    // Extract user ID from the request query parameters
    const { user_id } = req.query;
    const { caption, location } = req.body;
    const { url, success, type } = await postMedia(req.file);

    if (success) {
      const newPost = new Post({
        user_id,
        caption,
        location,
        media_url: url,
        media_type: type,
      });
      const data = await newPost.save();
      res.status(201).json({ data, message: "success" });
    } else {
      res.status(405).json({ data: null, message: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET USER POSTS //
export const getUserPosts = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const data = await Post.find({ user_id });
      res.status(201).json({ data, message: "success" });
    } else {
      res.status(404).json({ message: "Not found user_id" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// GET POST BY  ID //
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findById(id);
    res.status(201).json({ data, message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
