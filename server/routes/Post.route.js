import { Router } from "express";
const postRoute = new Router();
import multer from "multer";
import { verifyToken } from "../middleware/auth";
import { createPost, getPostById, getUserPosts } from "../controllers/Post";
// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    // Extract the file type (extension) from the original filename
    const fileExtension = file.originalname.split('.').pop();
    if (file.mimetype.includes("image")) {
      cb(null, "IMG_" + Date.now() + "." + fileExtension);
    } else {
      cb(null, "VD_" + Date.now() + "." + fileExtension);
    }
  },
});

const upload = multer({ storage: storage });
// routes //
postRoute.post("/posts", upload.single("media"), createPost);
postRoute.get("/posts", getUserPosts);
postRoute.get("/posts/:id", getPostById);
export default postRoute;
