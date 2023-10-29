import { Router } from "express";
import { addComment, deleteComment, updateComment } from "../controllers/Comment";
const commentRoute = new Router();

// routes //
commentRoute.post("/comments", addComment);
commentRoute.delete("/comments", deleteComment);
commentRoute.patch("/comments", updateComment);
export default commentRoute;
