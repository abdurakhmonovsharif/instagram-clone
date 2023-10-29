import { Router } from "express";
import { getFile } from "../controllers/File";
const fileRoute = new Router();

// routes //
fileRoute.get("/uploads/:id", getFile);
export default fileRoute;
