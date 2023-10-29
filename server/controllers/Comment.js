import Comment from "../models/Comments";
import Post from "../models/Post";
// ADD COMMENT IN POST //
export const addComment = async (req, res) => {
  try {
    const { post_id, user_id } = req.query;
    const { text } = req.body;

    const newComment = new Comment({
      post_id,
      user_id,
      text,
    });
    // Update the post's likes_count
    Post.findByIdAndUpdate(
      post_id,
      { $inc: { comments_count: 1 } },
      { new: true }
    )
      .then(async (updatedPost) => {
        if (!updatedPost) {
          return res.status(404).json({ message: "Post not found" });
        }
        const data = await newComment.save();
        res.status(201).json({ data, message: "Comment added successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE COMMENT //
export const deleteComment = async (req, res) => {
  try {
    const { comment_id, post_id } = req.query;
    const removedComment = await Comment.findOneAndDelete({ _id: comment_id });

    if (!removedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const response = await Post.findById(post_id);
    const currentPostCommentsCount = response.comments_count;

    // Update the post's comments_count to decrement by 1
    Post.findByIdAndUpdate(
      post_id,
      { comments_count: currentPostCommentsCount - 1 },
      { new: true }
    )
      .then(async (updatedPost) => {
        if (!updatedPost) {
          return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// UPDATE COMMENT //
export const updateComment = async (req, res) => {
  try {
    const { comment_id } = req.query;
    const { text } = req.body;
    Comment.findByIdAndUpdate(comment_id, { text }, { new: true })
      .then(() => {
        res.status(201).json({ message: "Comment is updated" });
      })
      .catch(() => {
        res.status(404).json({ error: "Comment not found" });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};